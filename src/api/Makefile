# Installation
install:
	pip install -r requirements.txt

# Dev tools
black-check:
	black --config pyproject.toml --check --diff .

black-fix:
	black --config pyproject.toml .

ruff-check:
	ruff check .

ruff-fix:
	ruff check . --fix

check: black-check ruff-check

format: black-fix ruff-fix

# Makefile for Database Migrations

# Define the environment variable file (if you use one)
ENV_FILE := .env

# Commands
MIGRATION_DIR := alembic
MIGRATION_DESCRIPTION := "Auto-generated migration"
VENV_NAME := myenv# Adjust this with your desired virtual environment name

# DATABASE_URL := $(shell grep -v '^#' $(ENV_FILE) | xargs)
.PHONY: venv
venv:
	@echo "Installing Alembic and dependencies..."
	pip install virtualenv
	python3 -m venv $(VENV_NAME)
	@echo "Activate the virtual environment using:"
	@echo "source $(VENV_NAME)/bin/activate"
	@echo "Then run 'make install-requirements' to install project dependencies."

.PHONY: install-requirements
install-requirements:
	@echo "Installing project dependencies..."
	. $(VENV_NAME)/bin/activate && pip install sqlalchemy alembic decouple

.PHONY: init-db
init-db:
	@echo "Initializing database..."
	mkdir -p ${MIGRATION_DIR}/versions
	. $(VENV_NAME)/bin/activate && alembic init $(MIGRATION_DIR)

.PHONY: create-migration
create-migration:
	@echo "Creating a new migration..."
	. $(VENV_NAME)/bin/activate && alembic revision --autogenerate -m $(MIGRATION_DESCRIPTION)

.PHONY: upgrade-db
upgrade-db:
	@echo "Upgrading database..."
	. $(VENV_NAME)/bin/activate && alembic upgrade head

.PHONY: migrate
migrate: create-migration upgrade-db
	@echo "Database migration complete."

.PHONY: rollback-db
rollback-db:
	@echo "Rolling back database..."
	. $(VENV_NAME)/bin/activate && alembic downgrade -1

.PHONY: rollback
rollback: rollback-db
	@echo "Database rollback complete."

.PHONY: clean-pyc
clean-pyc:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -rf {} +

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
