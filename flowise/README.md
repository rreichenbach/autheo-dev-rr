# Flowise Docker Setup

This directory contains Docker configuration for running [Flowise](https://github.com/FlowiseAI/Flowise), a low-code tool for building LLM applications with a drag-and-drop UI.

## Overview

Flowise is a powerful tool that allows you to build customized LLM flows using a visual interface. It consists of:
- A Node.js backend server
- A React frontend
- Third-party node integrations

This Docker setup uses the official Flowise Docker image and includes several vector databases that can be used with Flowise:
- Milvus - A cloud-native vector database for similarity search
- Qdrant - A vector search engine
- Redis - An in-memory data structure store
- Elasticsearch - A distributed search and analytics engine
- Chroma - A vector database for embeddings

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Make sure Docker and Docker Compose are installed on your system.
2. Clone this repository.
3. Navigate to the `flowise` directory.
4. Run the following command to start the containers:

```bash
docker-compose up -d
```

5. Access Flowise at http://localhost:13000

## Configuration

The Docker setup uses the following configuration:

- The Flowise application runs on port 13000
- Default credentials:
  - Username: admin
  - Password: password
- All data is persisted in Docker named volumes (no local storage)
- All vector databases are containerized and available at their respective ports
- All runtime components are contained within Docker containers

## Vector Databases

The following vector databases are included in this setup:

### Milvus

Milvus is a vector database built for AI applications and similarity search.

- **Port**: 19530
- **Connection URL**: `milvus:19530`
- **Admin UI Port**: 9091
- **Dependencies**: Requires Etcd and MinIO (included in the setup)

### Qdrant

Qdrant is a vector similarity search engine with extended filtering support.

- **Port**: 6333
- **Connection URL**: `http://qdrant:6333`
- **API Port**: 6334

### Redis

Redis is an in-memory data structure store that can be used as a database, cache, and message broker.

- **Port**: 6379
- **Connection URL**: `redis://redis:6379`

### Elasticsearch

Elasticsearch is a distributed, RESTful search and analytics engine.

- **Port**: 9200
- **Connection URL**: `http://elasticsearch:9200`
- **Transport Port**: 9300

### Chroma

Chroma is a database for building AI applications with embeddings.

- **Port**: 8000
- **Connection URL**: `http://chroma:8000`
- **Default Credentials**: admin:admin

## Environment Variables

You can customize the Flowise instance by modifying the environment variables in the `docker/.env` file or directly in the `docker-compose.yml` file:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | The port on which Flowise runs | 13000 |
| HOST | The host address | 0.0.0.0 |
| FLOWISE_USERNAME | Admin username | admin |
| FLOWISE_PASSWORD | Admin password | password |
| DATABASE_PATH | Path to store the database | /root/.flowise |
| APIKEY_PATH | Path to store API keys | /root/.flowise |
| SECRETKEY_PATH | Path to store secret keys | /root/.flowise |
| LOG_PATH | Path to store logs | /root/.flowise/logs |
| MILVUS_URL | URL for Milvus connection | milvus:19530 |
| QDRANT_URL | URL for Qdrant connection | http://qdrant:6333 |
| REDIS_URL | URL for Redis connection | redis://redis:6379 |
| ELASTICSEARCH_URL | URL for Elasticsearch connection | http://elasticsearch:9200 |
| CHROMA_URL | URL for Chroma connection | http://chroma:8000 |

## Usage

### Starting the Container

```bash
docker-compose up -d
```

### Stopping the Container

```bash
docker-compose stop
```

### Viewing Logs

```bash
docker-compose logs -f
```

### Using the Management Script

The `flowise.sh` script provides a convenient way to manage the Flowise Docker containers:

```bash
# Start all containers
./flowise.sh start

# View logs for a specific service
./flowise.sh logs flowise
./flowise.sh logs milvus
./flowise.sh logs qdrant

# Restart a specific service
./flowise.sh restart redis
./flowise.sh restart elasticsearch

# Check the status of all containers
./flowise.sh status
```

## Using Vector Databases with Flowise

Flowise can connect to the included vector databases for various use cases such as storing embeddings, semantic search, and more. Here's how to use them:

### Milvus

In Flowise, when configuring a vector store node:
- Select Milvus as the vector store type
- Use `milvus:19530` as the connection URL
- Configure the collection name and other parameters as needed

### Qdrant

In Flowise, when configuring a vector store node:
- Select Qdrant as the vector store type
- Use `http://qdrant:6333` as the connection URL
- Configure the collection name and other parameters as needed

### Redis

In Flowise, when configuring a vector store node:
- Select Redis as the vector store type
- Use `redis://redis:6379` as the connection URL
- Configure the index name and other parameters as needed

### Elasticsearch

In Flowise, when configuring a vector store node:
- Select Elasticsearch as the vector store type
- Use `http://elasticsearch:9200` as the connection URL
- Configure the index name and other parameters as needed

### Chroma

In Flowise, when configuring a vector store node:
- Select Chroma as the vector store type
- Use `http://chroma:8000` as the connection URL
- Configure the collection name and other parameters as needed

## Troubleshooting

- If the application doesn't start, check the logs:

```bash
docker-compose logs -f
```

- For vector database specific issues:

  - **Milvus**: Check if Etcd and MinIO services are running properly:
    ```bash
    ./flowise.sh logs etcd
    ./flowise.sh logs minio
    ```

  - **Elasticsearch**: If Elasticsearch fails to start due to memory issues, adjust the memory settings in docker-compose.yml:
    ```yaml
    environment:
      - "ES_JAVA_OPTS=-Xms256m -Xmx256m"  # Reduce memory usage
    ```

  - **Connection Issues**: Ensure that Flowise can connect to the vector databases by checking the network configuration:
    ```bash
    docker network inspect flowise-network
    ```

- To reset a specific vector database, you can prune its Docker volume and restart the service:
  ```bash
  # List all volumes
  docker volume ls
  
  # Remove a specific volume (replace volume-name with the actual volume name)
  docker volume rm volume-name
  
  # Example: To reset Qdrant data
  docker volume rm flowise_qdrant-data
  ./flowise.sh restart qdrant
  ```

- To check the Docker volumes being used:
  ```bash
  docker volume ls | grep flowise
  ```

## Security Considerations

- Change the default username and password in production environments
- Consider using a reverse proxy with HTTPS for production deployments
- Restrict access to the Docker container in production environments
- For vector databases:
  - Configure authentication for each vector database service
  - Restrict network access to the vector database ports
  - Use strong passwords for all services
  - Consider encrypting sensitive data stored in vector databases
  - Regularly backup vector database data
  - Keep all services updated with security patches