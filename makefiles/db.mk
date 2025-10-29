
# Main project targets
.PHONY: help


# Colors for output
GREEN := \033[0;32m]
YELLOW := \033[1;33m]
RED := \033[0;31m]
NC := \033[0m] # No Color



ROOT := $(shell git rev-parse --show-toplevel)

DOCKER_ROOT := $(ROOT)/docker


# ENVs
ENV_LOCAL := $(ROOT)/.env.local
ENV_ROOT := $(ROOT)/.env
ENV_DEV := $(ROOT)/config/.env.dev
ENV_STAGE := $(ROOT)/config/.env.stage
ENV_PROD := $(ROOT)/config/.env




help:
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo "📁 Modular Commands:"
	@echo "  Git:        make git-help"
	@echo "  Docker:     make docker-help"  

db-backup: 
	@echo "$(GREEN)💾 Creating database backup...$(NC)"
	bash ./scripts/backup.sh
#
#


.ONESHELL:
db-restore:
	@echo "$(GREEN)💾 Restoring database...$(NC)"
	@cd $(ROOT) 
	@touch $(ENV_LOCAL) $(ENV_ROOT)
	@set -a && . $(ENV_DEV) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@bash ./scripts/restore.sh