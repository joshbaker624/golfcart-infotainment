#!/bin/bash
# Try with Firefox instead

echo "Trying with Firefox..."

# Install Firefox if not present
if ! command -v firefox-esr &> /dev/null; then
    echo "Installing Firefox..."
    sudo apt update
    sudo apt install -y firefox-esr
fi

# Clean up
sudo pkill -9 Xorg 2>/dev/null
sudo pkill -9 firefox 2>/dev/null
sudo rm -f /tmp/.X*-lock 2>/dev/null
sleep 2

# Start server
cd /home/joshbaker/golfcart-infotainment/build
pkill -f "python3 -m http.server" 2>/dev/null
python3 -m http.server 8080 &
sleep 2

# Start with Firefox
xinit firefox-esr --kiosk http://localhost:8080 -- :0 -nocursor