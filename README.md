# Autheo Dev

## Included packages and tools
- Bolt.diy - Multi LLM AI-powered full-stack web-dev for NodeJS based app.  Browser based.
- Flowise - Drag&Drop UI to build your customized LLM flow
- Gitea - Self-hosted GitHub-like services (go based).  Code review, team collab, package registry, CI/CD, etc.
- Mailu - Local email server
- Mattermost - self hosted messaging for team collab (PostgreSQL backend)
- N8N - Workflow Automation
- OpenProject - Project Management
- Radicle Heartwood - Code collaboration and publishing stack, UI and cmdline (a’la GitLab, GitHub)
- Sonarqube - static/dynamic code analysis (bugs, vulnerabilities, code smells, etc.)

## Prerequisites
- A Linux or Linux-like OS (Mac Terminal, Windows with WSL or Cygwin, etc.)
- Docker must be installed on your build machine

## Building
1. Clone this repo:
   ```sh
   git clone <repo_url>
   ```
2. Navigate to the project directory:
   ```sh
   cd autheo-dev
   ```
3. Start the services:
   ```sh
   ./autheo.sh start
   ```
4. To see additional commands (e.g., stop, status, etc.):
   ```sh
   ./autheo.sh help
   ```

## Accessing the Web UI
Once all services are started, you can connect to the web UI through a browser by pointing it to:

`127.0.0.1` which is your loopback address (aka localhost), accessible only from your local machine.
For access by other devices on the same network, run this:

```sh
ifconfig | grep "inet " && docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' autheo-devhub-webui
```

This should report your loopback, the LAN address (for other devices on you network), and finally the address of container's IP within the Docker network.

## Web UI Development
To allow interative development of the webui, you'll want to stop the webui service and run the webui via Node locally (not within a container).  For that, you'll need a Node environment on your local machine.  Installing Node via NVM is generally recommended:

[NVM/Node Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

Now you can stop the webui and run 
1. Stop the webui container:
   ```sh
   ./autheo.sh stop webui
   ```
2. Start a Node development server (the project is defined by the package.json file)
   ```sh
   npm --prefix webui run dev
   ```
3. Vite should report the IP address/port to conntect to.  Example: http://localhost:5173  Point your brower there.  As you save code (eg. .tsx) changes, Vite should detect it and reload.

---
