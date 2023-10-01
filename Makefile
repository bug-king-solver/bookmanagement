
# Define the environment variable file (if you use one)
ENV_FILE := ./src/api/.env

# Commands
MIGRATION_DIR := ./src/api/alembic
MIGRATION_DESCRIPTION := "Auto-generated migration"
VENV_NAME := ./src/api/myenv# Adjust this with your desired virtual environment name
SEED_FILE := seed.py


.PHONY: setup
setup:
	@echo "Setup Server..."
	docker compose build 

.PHONY: run-server
run-server:
	@echo "Starting..."
	docker compose up 

.PHONY: install-requirements
install-requirements:
	@echo "Installing project dependencies..."
	pip3 install passlib python-dotenv psycopg2-binary sqlalchemy alembic decouple

.PHONY: run-db
run-db:
	@echo "Running postgresql server..."
	docker compose up --no-deps -d database

.PHONY: stop-db
stop-db:
	@echo "Stopping postgresql server..."
	docker compose down

.PHONY: create-migration
create-migration:
	@echo "Creating a new migration..."
	alembic upgrade head
	alembic revision --autogenerate -m $(MIGRATION_DESCRIPTION)

.PHONY: run-migrate
run-migrate: 
	@echo "Doing migration"
	alembic upgrade head

.PHONY: super-user
super-user:
	@echo "Make super user..."
	cd src/api && python3 ${SEED_FILE}

.PHONY: rollback-db
rollback-db:
	@echo "Rolling back database..."
	alembic downgrade -1

.PHONY: clean
clean: clean-pyc
	rm -rf $(MIGRATION_DIR)/versions

.PHONY: help
help:
	@echo "Usage: make <command>"
	@echo ""
	@echo "Commands:"
	@echo "  init-db       Initialize the Alembic migration directory"
	@echo "  create-migration  Create a new migration script"
	@echo "  upgrade-db    Apply all pending migrations"
	@echo "  migrate       Create and apply migrations in one step"
	@echo "  rollback-db   Rollback the last migration"
	@echo "  rollback      Rollback the last migration in one step"
	@echo "  clean-pyc     Remove Python bytecode files"
	@echo "  clean         Remove all generated migration files"
	@echo "  help          Show this help message"

# Set the default target
.DEFAULT_GOAL := help