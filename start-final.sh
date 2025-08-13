#!/bin/bash
# Final working version for Pi touchscreen

echo "Starting Golf Cart Infotainment System..."

# Clean up any existing processes
sudo pkill -9 Xorg 2>/dev/null || true
sudo pkill -9 chromium 2>/dev/null || true
pkill -f "python3 -m http.server" 2>/dev/null || true
sleep 2

# Build if needed
cd /home/joshbaker/golfcart-infotainment
if [ ! -f build/index.html ]; then
    echo "Building web version..."
    npm run build
fi

# Start web server
echo "Starting web server..."
cd build
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 2

# Start X server
echo "Starting display server..."
sudo X :0 -nocursor &
X_PID=$!
sleep 3

# Launch browser in foreground so we can see if it crashes
echo "Launching infotainment interface..."
sudo -u joshbaker DISPLAY=:0 chromium-browser \
    --kiosk \
    --no-sandbox \
    --disable-setuid-sandbox \
    --disable-dev-shm-usage \
    --disable-accelerated-2d-canvas \
    --disable-gpu \
    --window-size=800,480 \
    --window-position=0,0 \
    --noerrdialogs \
    --disable-infobars \
    --check-for-update-interval=31536000 \
    --disable-pinch \
    --overscroll-history-navigation=0 \
    --enable-features=OverlayScrollbar \
    --enable-touch-events \
    --touch-events=enabled \
    http://localhost:8080

# If we get here, browser exited
echo "Browser closed. Cleaning up..."
kill $SERVER_PID 2>/dev/null
sudo kill $X_PID 2>/dev/null