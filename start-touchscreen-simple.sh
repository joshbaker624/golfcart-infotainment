#!/bin/bash
# Simplified touchscreen startup

echo "Starting Golf Cart Infotainment (Simple mode)..."

# Kill any existing X or browser
sudo pkill -9 Xorg 2>/dev/null || true
sudo pkill -9 chromium 2>/dev/null || true
sleep 2

# Start X server in background
sudo X :0 -nocursor &
sleep 3

# Set display
export DISPLAY=:0

# Allow connections
XAUTHORITY=/root/.Xauthority sudo xhost +local: 2>/dev/null || true

# Set black background
sudo xsetroot -solid black 2>/dev/null || true

# Disable screen blanking
sudo xset s off 2>/dev/null || true
sudo xset -dpms 2>/dev/null || true

# Make sure web build exists
cd /home/joshbaker/golfcart-infotainment
if [ ! -f build/index.html ]; then
    echo "Building web version..."
    npm run build
fi

# Start web server
cd build
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 2

# Launch Chromium
echo "Launching browser..."
sudo -u joshbaker DISPLAY=:0 chromium-browser \
    --kiosk \
    --no-sandbox \
    --disable-dev-shm-usage \
    --disable-gpu \
    --disable-software-rasterizer \
    --disable-features=TranslateUI \
    --noerrdialogs \
    --disable-infobars \
    --check-for-update-interval=31536000 \
    http://localhost:8080

# Cleanup
kill $SERVER_PID 2>/dev/null
sudo pkill -9 Xorg 2>/dev/null