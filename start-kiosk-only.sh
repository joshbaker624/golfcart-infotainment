#!/bin/bash
# Start just the kiosk browser (assumes server is running)

echo "Starting kiosk browser..."

# Kill existing
sudo pkill -9 Xorg 2>/dev/null || true
sudo pkill -9 chromium 2>/dev/null || true
sleep 2

# Start minimal X
sudo X :0 -nocursor &
sleep 3

# Launch browser
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
    http://localhost:8080