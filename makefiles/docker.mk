# Colors for output (fixed)
GREEN  := \033[0;32m
YELLOW := \033[1;33m
RED    := \033[0;31m
NC     := \033[0m

.PHONY: docker-dev-up docker-stage-up docker-up


ROOT := $(shell git rev-parse --show-toplevel)

DOCKER_ROOT := $(ROOT)/docker


# ENVs
ENV_LOCAL := $(ROOT)/.env.local
ENV_ROOT := $(ROOT)/.env
ENV_DEV := $(ROOT)/config/.env.dev
ENV_STAGE := $(ROOT)/config/.env.stage
ENV_PROD := $(ROOT)/config/.env



.ONESHELL:
docker-dev-up: ## Start development environment
	@echo "${YELLOW}🚀 Starting Docker in Dev Env..."
	@cd $(ROOT) 
	@touch $(ENV_LOCAL) $(ENV_ROOT)
	@set -a && . $(ENV_DEV) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
# 	@echo "${GREEN}Project root is: $$PROJECT_ROOT"   # <-- Added line
	@docker compose -f $(DOCKER_ROOT)/compose.dev.yml up --build
	@echo "${GREEN}✅ "



.ONESHELL:
docker-multi-up : ## Start production environment
	@echo "🚀 Starting production environment..."
	@cd $(ROOT) 
	@touch $(ENV_PROD) $(ENV_LOCAL) $(ENV_ROOT)
	@set -a && . $(ENV_PROD) && . $(ENV_LOCAL) && . $(ENV_ROOT) && set +a;
	@export PROJECT_ROOT=$(ROOT)
	@docker compose -f $(DOCKER_ROOT)/compose.multi.prod.yml up --build
	@echo "✅ Multi Domain Production environment started"


# Maintenance operations
.PHONY: docker-clean docker-prune docker-system-prune

# docker-clean: ## Clean Docker images and containers
# 	@echo "🧹 Cleaning Docker resources..."
# 	@docker-compose -f $(DOCKER_COMPOSE_FILE) down --volumes --remove-orphans
# 	@docker system prune -f
# 	@echo "✅ Docker cleanup completed"

docker-prune: ## Remove unused Docker resources
	@echo "🧹 Pruning unused Docker resources..."
	@docker system prune -a -f --volumes
	@echo "✅ Docker pruning completed"

docker-system-prune: ## Deep clean Docker system
	@echo "🧹 Deep cleaning Docker system..."
	@docker system prune -a -f --volumes
	@docker network prune -f
	@docker volume prune -f
	@echo "✅ Docker system deep cleaned"