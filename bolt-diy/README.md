# Bolt.DIY Docker Setup

This directory contains Docker configuration for running [Bolt.DIY](https://github.com/stackblitz-labs/bolt.diy), a DIY AI assistant.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Development Mode

To run Bolt.DIY in development mode:

```bash
# Navigate to the bolt-diy directory
cd bolt-diy

# Start the development container
docker compose --profile development up
```

This will:
- Build the Docker image with the development target
- Store all runtime components and data in Docker volumes
- Start the development server on port 33000
- Access the application at http://localhost:33000

### Production Mode

To run Bolt.DIY in production mode:

```bash
# Navigate to the bolt-diy directory
cd bolt-diy

# Start the production container
docker compose --profile production up
```

This will:
- Build the Docker image with the production target
- Store all runtime components and data in Docker volumes
- Start the production server on port 33000
- Access the application at http://localhost:33000

## Docker Volumes

All runtime components and data are stored in Docker volumes:

- `bolt-diy-node-modules`: Node.js modules
- `bolt-diy-data`: Application data
- `bolt-diy-cache`: Application cache

No runtime data is stored on the local machine.

## Building the Docker Image Manually

If you prefer to build the Docker image manually:

```bash
# Build the development image
docker build . --target bolt-ai-development

# OR build the production image
docker build . --target bolt-ai-production
```

## Stopping the Containers

To stop the running containers:

```bash
docker compose --profile development down

# OR for production
docker compose --profile production down
```

## Additional Information

For more details about Bolt.DIY, please refer to the [official repository](https://github.com/stackblitz-labs/bolt.diy).