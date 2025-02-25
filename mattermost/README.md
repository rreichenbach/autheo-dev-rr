# Mattermost Docker Setup with PostgreSQL

This directory contains the Docker configuration for running Mattermost with PostgreSQL as the database backend. Mattermost is an open-source, self-hosted messaging platform designed for team collaboration.

## Configuration Overview

This setup includes:

1. **PostgreSQL Database**: A robust, production-ready database for Mattermost
2. **Mattermost Team Edition**: The open-source messaging platform

All runtime files are stored within Docker volumes, ensuring that no files are created on the host filesystem.

## Docker Volumes

The following Docker volumes are used to store persistent data:

```
mattermost-postgres        # PostgreSQL database files
mattermost-data            # Mattermost data files
mattermost-logs            # Mattermost log files
mattermost-config          # Mattermost configuration files
mattermost-plugins         # Mattermost server plugins
mattermost-client-plugins  # Mattermost client plugins
```

## Getting Started

### Starting Mattermost

To start Mattermost with PostgreSQL, run the following command from this directory:

```bash
docker-compose up -d
```

This will start both the Mattermost server and PostgreSQL database in detached mode.

### Accessing Mattermost

Once the containers are running, you can access Mattermost at:

```
http://localhost:8085
```

The first time you access Mattermost, you'll be guided through the setup process to create an admin account.

### Stopping Mattermost

To stop the Mattermost server and PostgreSQL database, run:

```bash
docker-compose down
```

This will stop and remove the containers, but your data will be preserved in the Docker volumes.

## PostgreSQL Database Configuration

The PostgreSQL database is configured with the following settings:

- **Database Name**: mattermost
- **Username**: mmuser
- **Password**: mmuser_password (you should change this in production)
- **Port**: 5433 (mapped to internal port 5432)

**Note**: We're using port 5433 for PostgreSQL to avoid conflicts with other PostgreSQL instances in the environment. This can be changed later when integrating with a master PostgreSQL instance.

## Mattermost Configuration

Mattermost is configured to use PostgreSQL with the following connection string:
```
postgres://mmuser:mmuser_password@postgres:5432/mattermost?sslmode=disable
```

Note that within the Docker network, the PostgreSQL service is still accessible on the default port 5432, even though it's mapped to 5433 on the host.

Other important configuration settings:
- Web interface accessible on port 8085
- File storage configured to use the local file system within the container
- Plugins enabled

## Upgrading

To upgrade Mattermost to a newer version:

1. Update the image tag in docker-compose.yml (if you want a specific version)
2. Run the following commands:

```bash
docker-compose down
docker-compose pull
docker-compose up -d
```

## Backup and Restore

### Backup

To backup your Mattermost data and PostgreSQL database, you can use Docker's volume backup capabilities:

```bash
# Stop the containers first
docker-compose down

# Backup the volumes (example for mattermost-data volume)
docker run --rm -v mattermost-data:/source -v $(pwd):/backup alpine tar -czf /backup/mattermost-data-backup.tar.gz -C /source .
```

Repeat the backup command for each volume you want to backup.

### Restore

To restore from a backup:

```bash
# Stop the containers first
docker-compose down

# Restore a volume (example for mattermost-data volume)
docker run --rm -v mattermost-data:/target -v $(pwd):/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/mattermost-data-backup.tar.gz -C /target"

# Start the containers
docker-compose up -d
```

## Troubleshooting

### Logs

To view the logs for the Mattermost container:

```bash
docker-compose logs -f mattermost
```

For PostgreSQL logs:

```bash
docker-compose logs -f postgres
```

### Database Connection Issues

If Mattermost cannot connect to the database, ensure that:

1. The PostgreSQL container is running: `docker-compose ps`
2. The database credentials in docker-compose.yml are correct
3. The database has been properly initialized

## Future Integration

When ready to integrate with a master PostgreSQL instance:
1. Remove the PostgreSQL service from the docker-compose.yml
2. Update the Mattermost database connection string to point to the master PostgreSQL instance
3. Export the data from the Docker volume and import it to the master instance

## Additional Resources

For more information, refer to:

- [Mattermost Documentation](https://docs.mattermost.com/)
- [Mattermost Docker Documentation](https://docs.mattermost.com/install/install-docker.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)