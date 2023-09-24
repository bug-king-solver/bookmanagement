# Define environment variables
export APP_PORT=8000
export FRONTEND_PORT=3000
export DB_USER=postgres
export DB_PASSWORD=123456
export DB_NAME=db
# Docker Compose commands
.PHONY: build-backend
build-backend:
    docker-compose build backend

.PHONY: build-frontend
build-frontend:
    docker-compose build frontend

.PHONY: build
build: build-backend build-frontend
	@echo -e "$(GREEN)===================================================================="
	@echo "SETUP SUCCEEDED"
	@echo -e "Run 'make up' to start the fastAPI development server and the node server.$(COFF)"

.PHONY: up
up:
    docker-compose up

.PHONY: down
down:
    docker-compose down

.PHONY: run-backend
run-backend:
    docker-compose run -e DATABASE_URL=$(DATABASE_URL) -p $(APP_PORT):8000 backend

.PHONY: run-frontend
run-frontend:
    docker-compose run -p $(FRONTEND_PORT):3000 frontend
