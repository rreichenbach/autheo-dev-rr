# Mailu Local Email Server Setup

This directory contains a simplified configuration for running Mailu email server locally using Docker.

## Features

- Complete email server solution including:
  - SMTP (ports 25, 465, 587)
  - IMAP (ports 143, 993)
  - POP3 (ports 110, 995)
  - Webmail interface
  - Admin interface
  - Antispam (Rspamd)

## Initial Setup

1. Create required directories:
```bash
mkdir -p data/{certs,dav,dkim,data,filter,mail,mailqueue,overrides/{nginx,dovecot,postfix,rspamd},redis}
```

2. Start the services:
```bash
docker-compose up -d
```

3. Access the admin interface:
   - URL: http://localhost/admin
   - Initial admin account:
     * Email: admin@localhost
     * Password: changeme123

4. Create additional users through the admin interface as needed.

## Email Client Configuration

### SMTP Settings
- Server: localhost
- Ports: 
  * 587 (STARTTLS)
  * 465 (SSL/TLS)
- Authentication: Required
- Username: full email address (e.g., user@localhost)

### IMAP Settings
- Server: localhost
- Port: 993 (SSL/TLS)
- Authentication: Required
- Username: full email address

### POP3 Settings
- Server: localhost
- Port: 995 (SSL/TLS)
- Authentication: Required
- Username: full email address

## Testing Email Flow

1. Create a test user via admin interface (http://localhost/admin)

2. Send a test email using command line:
```bash
docker exec -it mailu-smtp sendmail user@localhost
From: admin@localhost
Subject: Test Email

This is a test email.
.
```

3. Access webmail:
   - URL: http://localhost/webmail
   - Login with your email credentials

## Security Notes

1. This is a development setup using:
   - Self-signed certificates
   - SQLite database
   - Simplified security settings
   - Debug logging enabled

2. For production use:
   - Change all default passwords
   - Use proper TLS certificates
   - Configure proper domain name
   - Enable antivirus
   - Adjust rate limits

## Maintenance

### Logs
View logs:
```bash
docker-compose logs -f
```

### Updates
Update containers:
```bash
docker-compose pull
docker-compose up -d
```

### Backup
Important directories to backup:
- ./data/mail (emails)
- ./data/data (user database)
- ./data/dkim (DKIM keys)