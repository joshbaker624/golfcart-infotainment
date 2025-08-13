#!/bin/bash
# Working startup based on test results

echo "Starting Golf Cart Infotainment..."

# Set runtime dir
export XDG_RUNTIME_DIR=/run/user/$(id -u)
mkdir -p $XDG_RUNTIME_DIR 2>/dev/null

# Clean up
sudo pkill -9 Xorg 2>/dev/null
sudo pkill -9 chromium 2>/dev/null
sudo rm -f /tmp/.X*-lock 2>/dev/null
pkill -f "python3 -m http.server" 2>/dev/null
sleep 2

# Start web server
cd /home/joshbaker/golfcart-infotainment
if [ ! -f build/index.html ]; then
    echo "Building..."
    npm run build
fi
cd build
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 2

# Use the same flags that worked in xvfb test
xinit /bin/sh -c "
    # Wait for X to fully start
    sleep 2
    
    # Run chromium with working flags from the test
    exec /usr/lib/chromium/chromium \
        --kiosk \
        --force-renderer-accessibility \
        --enable-remote-extensions \
        --enable-gpu-rasterization \
        --no-default-browser-check \
        --disable-pings \
        --media-router=0 \
        --disable-dev-shm-usage \
        --use-angle=swiftshader-webgl \
        --no-sandbox \
        --disable-gpu \
        --start-fullscreen \
        --window-size=800,480 \
        --window-position=0,0 \
        --user-data-dir=/tmp/chromium-kiosk \
        http://localhost:8080
" -- :0 -ac -nocursor

# Cleanup
kill $SERVER_PID 2>/dev/null