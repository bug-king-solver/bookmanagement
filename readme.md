# Datacose FullStack Developer Challenge

## Technology Stack
- **Frontend:** Nuxt.js 2 with Typed Vuex, TypeScript, and Composition API
- **Backend:** FastAPI with SQLAlchemy
- **Database:** PostgreSQL (Dockerized)
- **Development Tools:** Docker, Docker Compose

## Prerequisites
Ensure you have the following prerequisites installed before starting:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Please make sure any local PostgreSQL server is turned off to avoid conflicts with the Dockerized database.

## Getting Started

### Project Setup
Run the following commands to set up the project:
```bash
make setup
```

### Starting the Server
To start the server, use the following commands:
```bash
# Set up the project
make setup

# Start the server
make run-server
```

### Database Migration
Perform database migration with the following commands:
```bash
# Start the database
make run-db

# Create a migration
make create-migration

# Run the migration
make run-migrate

# Create a superuser (name: Datacose, password: password)
make super-user
```

### Rollback Database
To rollback the database to a previous state, use the following command:
```bash
make roll-db
```

### Stop the Database
To stop the Dockerized PostgreSQL database, use the following command:
```bash
make stop-db
```

## Usage

## Contribution

## License
```