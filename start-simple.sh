#!/bin/bash
# Simple start script that doesn't require root

# Set display if not set
export DISPLAY=${DISPLAY:-:0}

# Ensure we're in the right directory
cd /home/joshbaker/golfcart-infotainment

# Start the app with required flags
npm start -- --no-sandbox --disable-gpu-sandbox --disable-setuid-sandbox