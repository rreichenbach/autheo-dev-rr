#!/bin/bash

# Script to manage Mattermost Docker services

# Function to display usage information
show_usage() {
    echo "Usage: $0 [command]"
    echo "Commands:"
    echo "  start       - Start Mattermost services"
    echo "  stop        - Stop Mattermost services"
    echo "  restart     - Restart Mattermost services"
    echo "  status      - Show status of Mattermost services"
    echo "  logs        - Show logs from Mattermost services"
    echo "  update      - Update Mattermost to the latest version"
    echo "  backup      - Backup Mattermost data volumes"
    echo "  restore     - Restore Mattermost data from backup"
    echo "  help        - Show this help message"
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
    echo "Starting Mattermost services..."
    docker-compose up -d
    echo "Mattermost should be available at http://localhost:8085"
}

# Function to stop services
stop_services() {
    echo "Stopping Mattermost services..."
    docker-compose down
}

# Function to restart services
restart_services() {
    echo "Restarting Mattermost services..."
    docker-compose restart
    echo "Mattermost should be available at http://localhost:8085"
}

# Function to show service status
show_status() {
    echo "Mattermost service status:"
    docker-compose ps
}

# Function to show logs
show_logs() {
    echo "Showing Mattermost logs (press Ctrl+C to exit):"
    docker-compose logs -f
}

# Function to update Mattermost
update_mattermost() {
    echo "Updating Mattermost to the latest version..."
    docker-compose down
    docker-compose pull
    docker-compose up -d
    echo "Mattermost has been updated and is running at http://localhost:8085"
}

# Function to backup Mattermost data
backup_mattermost() {
    echo "Backing up Mattermost data..."
    
    # Create backup directory if it doesn't exist
    mkdir -p ./backups
    
    # Get current date for backup filename
    BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
    
    # Stop services before backup
    docker-compose down
    
    # Backup each volume
    echo "Backing up PostgreSQL data..."
    docker run --rm -v mattermost-postgres:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/postgres_${BACKUP_DATE}.tar.gz -C /source .
    
    echo "Backing up Mattermost data..."
    docker run --rm -v mattermost-data:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/data_${BACKUP_DATE}.tar.gz -C /source .
    
    echo "Backing up Mattermost logs..."
    docker run --rm -v mattermost-logs:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/logs_${BACKUP_DATE}.tar.gz -C /source .
    
    echo "Backing up Mattermost config..."
    docker run --rm -v mattermost-config:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/config_${BACKUP_DATE}.tar.gz -C /source .
    
    echo "Backing up Mattermost plugins..."
    docker run --rm -v mattermost-plugins:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/plugins_${BACKUP_DATE}.tar.gz -C /source .
    
    echo "Backing up Mattermost client plugins..."
    docker run --rm -v mattermost-client-plugins:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/client_plugins_${BACKUP_DATE}.tar.gz -C /source .
    
    # Start services again
    docker-compose up -d
    
    echo "Backup completed. Files saved to ./backups/"
    ls -la ./backups/
}

# Function to restore Mattermost data
restore_mattermost() {
    if [ -z "$2" ]; then
        echo "Error: Backup date required"
        echo "Usage: $0 restore YYYYMMDD_HHMMSS"
        echo "Available backups:"
        ls -1 ./backups/ | grep -o "[0-9]\{8\}_[0-9]\{6\}" | sort | uniq
        exit 1
    fi
    
    BACKUP_DATE=$2
    
    # Check if backup files exist
    if [ ! -f "./backups/postgres_${BACKUP_DATE}.tar.gz" ]; then
        echo "Error: Backup files for ${BACKUP_DATE} not found"
        exit 1
    fi
    
    echo "Restoring Mattermost data from backup ${BACKUP_DATE}..."
    
    # Stop services before restore
    docker-compose down
    
    # Restore each volume
    echo "Restoring PostgreSQL data..."
    docker run --rm -v mattermost-postgres:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/postgres_${BACKUP_DATE}.tar.gz -C /target"
    
    echo "Restoring Mattermost data..."
    docker run --rm -v mattermost-data:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/data_${BACKUP_DATE}.tar.gz -C /target"
    
    echo "Restoring Mattermost logs..."
    docker run --rm -v mattermost-logs:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/logs_${BACKUP_DATE}.tar.gz -C /target"
    
    echo "Restoring Mattermost config..."
    docker run --rm -v mattermost-config:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/config_${BACKUP_DATE}.tar.gz -C /target"
    
    echo "Restoring Mattermost plugins..."
    docker run --rm -v mattermost-plugins:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/plugins_${BACKUP_DATE}.tar.gz -C /target"
    
    echo "Restoring Mattermost client plugins..."
    docker run --rm -v mattermost-client-plugins:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/client_plugins_${BACKUP_DATE}.tar.gz -C /target"
    
    # Start services again
    docker-compose up -d
    
    echo "Restore completed. Mattermost is running with restored data."
}

# Check command line arguments
if [ $# -eq 0 ]; then
    show_usage
    exit 0
fi

# Process command
case "$1" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    update)
        update_mattermost
        ;;
    backup)
        backup_mattermost
        ;;
    restore)
        restore_mattermost "$@"
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