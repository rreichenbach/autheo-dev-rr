#!/bin/bash

# Script to manage Autheo DevHub Docker services

# Function to display usage information
show_usage() {
    echo "Usage: $0 [command] [service]"
    echo "Commands:"
    echo "  start       - Start services (all or specific service)"
    echo "  stop        - Stop services (all or specific service)"
    echo "  restart     - Restart services (all or specific service)"
    echo "  status      - Show status of services"
    echo "  logs        - Show logs from services (all or specific service)"
    echo "  update      - Update services to the latest version"
    echo "  help        - Show this help message"
    echo ""
    echo "Services:"
    echo "  webui       - Web UI service"
    echo "  postgres    - PostgreSQL database"
    echo "  gitea       - Gitea service"
    echo "  openproject - OpenProject service"
    echo "  n8n         - n8n workflow automation"
    echo "  mattermost  - Mattermost team communication"
    echo "  all         - All services (default)"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed or not in PATH"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed or not in PATH"
    exit 1
fi

# Function to start services
start_services() {
    local service=$1
    
    if [ -z "$service" ] || [ "$service" = "all" ]; then
        echo "Starting all Autheo DevHub services..."
        docker-compose up -d
        echo "Services are starting. Use '$0 status' to check status."
    else
        echo "Starting $service service..."
        docker-compose up -d $service
        echo "$service service is starting."
    fi
}

# Function to stop services
stop_services() {
    local service=$1
    
    if [ -z "$service" ] || [ "$service" = "all" ]; then
        echo "Stopping all Autheo DevHub services..."
        docker-compose down
    else
        echo "Stopping $service service..."
        docker-compose stop $service
    fi
}

# Function to restart services
restart_services() {
    local service=$1
    
    if [ -z "$service" ] || [ "$service" = "all" ]; then
        echo "Restarting all Autheo DevHub services..."
        docker-compose restart
    else
        echo "Restarting $service service..."
        docker-compose restart $service
    fi
}

# Function to show service status
show_status() {
    echo "Autheo DevHub service status:"
    docker-compose ps
}

# Function to show logs
show_logs() {
    local service=$1
    
    if [ -z "$service" ] || [ "$service" = "all" ]; then
        echo "Showing logs for all services (press Ctrl+C to exit):"
        docker-compose logs -f
    else
        echo "Showing logs for $service (press Ctrl+C to exit):"
        docker-compose logs -f $service
    fi
}

# Function to update services
update_services() {
    local service=$1
    
    if [ -z "$service" ] || [ "$service" = "all" ]; then
        echo "Updating all Autheo DevHub services..."
        docker-compose down
        docker-compose pull
        docker-compose up -d
    else
        echo "Updating $service service..."
        docker-compose stop $service
        docker-compose pull $service
        docker-compose up -d $service
    fi
}

# Check command line arguments
if [ $# -eq 0 ]; then
    show_usage
    exit 0
fi

# Process command
case "$1" in
    start)
        start_services "$2"
        ;;
    stop)
        stop_services "$2"
        ;;
    restart)
        restart_services "$2"
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs "$2"
        ;;
    update)
        update_services "$2"
        ;;
    help)
        show_usage
        ;;
    *)
        echo "Error: Unknown command '$1'"
        show_usage
        exit 1
        ;;
esac

exit 0