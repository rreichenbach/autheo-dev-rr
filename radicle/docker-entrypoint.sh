#!/bin/bash
set -e

# Start the node in the background
rad node start &
NODE_PID=$!

# Wait for node to start
sleep 5

# Keep container running
wait $NODE_PID