#!/bin/bash
set -e

# Start ssh-agent and add key
eval $(ssh-agent -s)
if [ -f "$RAD_HOME/keys/radicle" ]; then
    # Add the Radicle SSH key to the agent
    ssh-add "$RAD_HOME/keys/radicle"
fi

# Start the node in the background
rad node start &
NODE_PID=$!

# Wait for node to start
sleep 5

# Keep container running
wait $NODE_PID