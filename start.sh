#!/bin/bash
# Golf Cart Infotainment Startup Script

# Set display
export DISPLAY=:0

# Set runtime directory
export XDG_RUNTIME_DIR=/run/user/$(id -u)
mkdir -p $XDG_RUNTIME_DIR
chmod 0700 $XDG_RUNTIME_DIR

# Optional: Disable screen blanking
xset s off
xset -dpms
xset s noblank

# Start the application
cd /home/pi/golfcart-infotainment
npm start