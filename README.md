# Autheo DevHub

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
Once all services are started, you can connect to the web UI through a browser using the addresses returned by running:

```sh
ifconfig | grep "inet " && docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' autheo-devhub-webui
```

- `127.0.0.1` is your loopback address, accessible only from your local machine.
- Another address (e.g., `10.0.0.151`) is your LAN address, reachable by other devices on the same network.
- The last IP address is the container's IP within the Docker network.

---