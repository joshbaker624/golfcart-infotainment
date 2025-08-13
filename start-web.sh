#!/bin/bash
# Alternative: Run as web server and use Chromium kiosk

echo "Starting Golf Cart Infotainment (Web mode)..."

# Kill any existing instances
pkill -f "golfcart-infotainment"
pkill -f chromium

# Build the web app
cd /home/joshbaker/golfcart-infotainment
npm run build

# Start a simple web server
echo "Starting web server on port 8080..."
cd build
python3 -m http.server 8080 &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Kill any existing X sessions
sudo pkill -9 Xorg 2>/dev/null || true
sleep 2

# Start X with Chromium in kiosk mode
sudo xinit /bin/bash -c "
    # Basic X setup
    xset s off
    xset -dpms
    xset s noblank
    
    # Run Chromium in kiosk mode
    su - joshbaker -c 'chromium-browser --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble --disable-features=TranslateUI --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage http://localhost:8080'
" -- :0 -nocursor

# Cleanup
kill $SERVER_PID 2>/dev/null