# Self-hosted N8N Instance

This directory contains the configuration for running a self-hosted n8n instance using Docker.

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

1. Configure Environment Variables:
   - Copy or modify the `.env` file with your desired configuration
   - Update the following important variables:
     - `N8N_BASIC_AUTH_USER` and `N8N_BASIC_AUTH_PASSWORD` for n8n login
     - `POSTGRES_PASSWORD` for database security
     - SMTP settings if you want to enable email notifications

2. Start the Services:
```bash
docker-compose up -d
```

3. Access N8N:
   - Open your browser and navigate to: `http://localhost:5678`
   - Login using the credentials set in your .env file

## Configuration

### Security
- The default configuration includes basic authentication
- Make sure to change the default passwords in the .env file
- N8N is configured to use PostgreSQL for data persistence

### Database
- PostgreSQL is used as the database
- Data is persisted using Docker volumes
- Database port is exposed on 5432 (can be modified in docker-compose.yml)

### Email
- SMTP configuration is included but disabled by default
- Update the SMTP settings in .env to enable email notifications

## Maintenance

### Backup
The following directories are persisted:
- N8N data: Docker volume `n8n_data`
- PostgreSQL data: Docker volume `postgres_data`

### Updates
To update n8n to the latest version:
```bash
docker-compose pull
docker-compose up -d
```

### Logs
To view logs:
```bash
docker-compose logs -f
```

## Troubleshooting

If you encounter issues:
1. Check the logs using `docker-compose logs -f`
2. Ensure all environment variables are properly set
3. Verify that ports 5678 and 5432 are not in use by other services