#!/bin/bash

# Flowise Docker management script

# Set the directory to the location of this script
cd "$(dirname "$0")"

# Function to display usage information
function show_usage {
    echo "Flowise Docker Management Script"
    echo ""
    echo "Usage: ./flowise.sh [command] [service]"
    echo ""
    echo "Commands:"
    echo "  start       Start the Flowise containers"
    echo "  stop        Stop the Flowise containers"
    echo "  restart     Restart the Flowise containers"
    echo "  logs        View the container logs"
    echo "  rebuild     Rebuild and start the containers"
    echo "  status      Check the status of the containers"
    echo "  volumes     List all Docker volumes used by Flowise"
    echo "  prune       Remove all Docker volumes (WARNING: This will delete all data)"
    echo "  help        Display this help message"
    echo ""
    echo "Services (for logs and restart commands):"
    echo "  flowise     Flowise application"
    echo "  milvus      Milvus vector database"
    echo "  qdrant      Qdrant vector database"
    echo "  redis       Redis database"
    echo "  elasticsearch  Elasticsearch search engine"
    echo "  chroma      Chroma vector database"
    echo ""
    echo "Examples:"
    echo "  ./flowise.sh logs flowise    View logs for the Flowise application"
    echo "  ./flowise.sh restart redis   Restart the Redis service"
    echo "  ./flowise.sh volumes         List all Docker volumes"
    echo ""
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed or not in the PATH"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed or not in the PATH"
    exit 1
fi

# Process commands
case "$1" in
    start)
        echo "Starting Flowise containers..."
        docker-compose up -d
        echo "Flowise is now running at http://localhost:13000"
        echo "Vector databases are available at:"
        echo "  - Milvus: localhost:19530"
        echo "  - Qdrant: http://localhost:6333"
        echo "  - Redis: localhost:6379"
        echo "  - Elasticsearch: http://localhost:9200"
        echo "  - Chroma: http://localhost:8000"
        ;;
    stop)
        echo "Stopping Flowise containers..."
        docker-compose stop
        echo "Flowise containers stopped"
        ;;
    restart)
        if [ -z "$2" ]; then
            echo "Restarting all Flowise containers..."
            docker-compose restart
            echo "Flowise has been restarted and is running at http://localhost:13000"
        else
            echo "Restarting $2 service..."
            docker-compose restart "$2"
            echo "$2 service has been restarted"
        fi
        ;;
    logs)
        if [ -z "$2" ]; then
            echo "Showing all container logs (press Ctrl+C to exit)..."
            docker-compose logs -f
        else
            echo "Showing $2 container logs (press Ctrl+C to exit)..."
            docker-compose logs -f "$2"
        fi
        ;;
    rebuild)
        echo "Rebuilding Flowise containers..."
        docker-compose down
        docker-compose build --no-cache
        docker-compose up -d
        echo "Flowise has been rebuilt and is running at http://localhost:13000"
        ;;
    status)
        echo "Checking Flowise container status..."
        docker-compose ps
        ;;
    volumes)
        echo "Listing Docker volumes used by Flowise..."
        docker volume ls | grep flowise
        ;;
    prune)
        echo "WARNING: This will delete all data stored in Docker volumes."
        read -p "Are you sure you want to continue? (y/n): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            echo "Stopping containers..."
            docker-compose down
            echo "Removing Docker volumes..."
            docker volume ls -q | grep flowise | xargs -r docker volume rm
            echo "All Flowise Docker volumes have been removed."
            echo "You can restart the containers with './flowise.sh start'"
        else
            echo "Operation cancelled."
        fi
        ;;
    help|*)
        show_usage
        ;;
esac

exit 0