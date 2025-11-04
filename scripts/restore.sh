#!/bin/bash

# Stop script if any command fails
set -e


# Parse values from .env 
POSTGRES_CONTAINER_NAME="db"
BACKEND_CONTAINER_NAME="api"
POSTGRES_USER="${POSTGRES_USER}"
POSTGRES_DB="${POSTGRES_DB}"
BACKUP_DIR="./backup"

# Validate required environment variables
if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_DB" ] || [ -z "$POSTGRES_PASSWORD" ]; then
    echo "❌ Missing required environment variables: POSTGRES_USER, POSTGRES_DB or POSTGRES_PASSWORD"
    exit 1
fi
echo " [INFO] POSTGRES_USER: $POSTGRES_USER"
# Check if postgres container is running
# if ! docker ps --format '{{.Names}}' | grep -q "$POSTGRES_CONTAINER_NAME"; then
#     echo "❌ PostgreSQL container $POSTGRES_CONTAINER_NAME is not running"
#     exit 1
# fi

# Check if backend container exists (could be running or stopped)
BACKEND_EXISTS=$(docker ps -a --format '{{.Names}}' | grep -c "$BACKEND_CONTAINER_NAME" || echo "0")

# Find the latest backup by modification time
BACKUP_FILE=$(ls -1t "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null | head -n 1)
if [ -z "$BACKUP_FILE" ]; then
    echo "❌ No backup files found in $BACKUP_DIR"
    exit 1
fi

# Extract just the filename from the full path
BACKUP_FILE=$(basename "$BACKUP_FILE")

# Check if the backup file exists
if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_DIR/$BACKUP_FILE"
    exit 1
fi

# Test if backup file is valid
if ! gunzip -t "$BACKUP_DIR/$BACKUP_FILE" 2>/dev/null; then
    echo "❌ Backup file is corrupted: $BACKUP_FILE"
    exit 1
fi

echo "⚠️  WARNING: This will replace your current database!"
echo "Database: $POSTGRES_DB"
echo "Backup file: $BACKUP_FILE"
if [ "$BACKEND_EXISTS" -gt 0 ]; then
    echo "Backend container: $BACKEND_CONTAINER_NAME (will be restarted)"
else
    echo "Backend container: $BACKEND_CONTAINER_NAME (not found - will skip restart)"
fi
read -p "Type 'yes' to continue: " confirm

if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled."
    exit 0
fi

# # Step 1: Stop backend container if it exists and is running
# if [ "$BACKEND_EXISTS" -gt 0 ]; then
#     if docker ps --format '{{.Names}}' | grep -q "$BACKEND_CONTAINER_NAME"; then
#         echo "🛑 Stopping backend container..."
#         docker stop "$BACKEND_CONTAINER_NAME"
#         BACKEND_WAS_RUNNING=true
#     else
#         echo "📋 Backend container is already stopped"
#         BACKEND_WAS_RUNNING=false
#     fi
# else
#     echo "📋 Backend container not found, skipping stop"
#     BACKEND_WAS_RUNNING=false
# fi

# echo "🔄 Restoring database..."

# Step 2: Terminate active connections

export PGPASSWORD="$DB_PASS"

# --- Terminate active connections ---
echo "[INFO] Terminating active connections on $POSTGRES_DB..."
psql -h "$POSTGRES_CONTAINER_NAME" -U "$POSTGRES_USER" -d postgres -c \
"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$POSTGRES_DB';"

# --- Drop and recreate database ---
echo "[INFO] Dropping and recreating database: $POSTGRES_DB..."
psql -h "$POSTGRES_CONTAINER_NAME" -U "$POSTGRES_USER" -d postgres -v ON_ERROR_STOP=1 <<SQL
DROP DATABASE IF EXISTS "$POSTGRES_DB";
CREATE DATABASE "$POSTGRES_DB";
SQL

# --- Restore database from latest backup ---
echo "[INFO] Restoring database from backup..."
gunzip -c "$BACKUP_DIR/$BACKUP_FILE" | psql -h "$POSTGRES_CONTAINER_NAME" -U "$POSTGRES_USER" -d "$POSTGRES_DB" --single-transaction

echo "[SUCCESS] Database restore completed successfully!"


GREEN='\033[0;32m'
NC='\033[0m' 
echo -e "${GREEN}🎉 Database restore completed!${NC}"
echo "Next steps:"
echo "  - Check your application logs: docker logs $BACKEND_CONTAINER_NAME"
echo "  - Test your application endpoints"