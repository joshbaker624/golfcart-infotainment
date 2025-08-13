#!/bin/bash
# Minimal startup - just the essentials

echo "Starting minimal infotainment..."

# Clean up
sudo pkill -9 Xorg 2>/dev/null
sudo pkill -9 chromium 2>/dev/null
sudo rm -f /tmp/.X*-lock 2>/dev/null
sleep 2

# Ensure web server is running
cd /home/joshbaker/golfcart-infotainment/build
pkill -f "python3 -m http.server" 2>/dev/null
python3 -m http.server 8080 &
sleep 2

# Start with most minimal X and browser config
xinit /bin/sh -c "
    sleep 1
    exec chromium-browser \
        --kiosk \
        --no-sandbox \
        --disable-gpu \
        --disable-software-rasterizer \
        --disable-dev-shm-usage \
        --disable-web-security \
        --disable-features=VizDisplayCompositor \
        --disable-breakpad \
        --disable-client-side-phishing-detection \
        --disable-component-update \
        --disable-default-apps \
        --disable-domain-reliability \
        --disable-extensions \
        --disable-features=AudioServiceOutOfProcess \
        --disable-hang-monitor \
        --disable-popup-blocking \
        --disable-prompt-on-repost \
        --disable-sync \
        --disable-translate \
        --disable-web-resources \
        --disable-client-side-phishing-detection \
        --disk-cache-size=33554432 \
        --hide-scrollbars \
        --metrics-recording-only \
        --mute-audio \
        --no-first-run \
        --safebrowsing-disable-auto-update \
        --start-fullscreen \
        --user-data-dir=/tmp/chromium \
        http://localhost:8080
" -- :0 -ac -nocursor