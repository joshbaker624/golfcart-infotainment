#!/bin/bash
# Most basic X startup possible

echo "Starting basic X with terminal..."

# Ensure HDMI is on
tvservice -p
sleep 2

# Kill any existing X
sudo pkill -9 Xorg 2>/dev/null || true
sleep 1

# Start X with just a terminal
sudo xinit /usr/bin/lxterminal -- :0 -nolisten tcp