#!/bin/bash
# Safe startup with better error handling

echo "Starting Golf Cart Infotainment System (Safe Mode)..."

# Function to cleanup on exit
cleanup() {
    echo "Cleaning up..."
    pkill -f "python3 -m http.server" 2>/dev/null
    sudo pkill -9 chromium 2>/dev/null
    sudo pkill -9 Xorg 2>/dev/null
}
trap cleanup EXIT

# Check if X is already running
if pgrep -x Xorg > /dev/null; then
    echo "X server already running, killing it..."
    sudo pkill -9 Xorg
    sleep 2
fi

# Check who's logged into the console
echo "Console status:"
who

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

# Method 1: Try using the existing console
echo "Attempting to start on console..."
if [ -z "$DISPLAY" ]; then
    # We're on console, start X directly
    if [ "$USER" = "joshbaker" ]; then
        # Running as user
        xinit /bin/bash -c "
            sleep 2
            chromium-browser \
                --kiosk \
                --no-sandbox \
                --disable-setuid-sandbox \
                --disable-dev-shm-usage \
                --disable-gpu \
                --window-size=800,480 \
                --noerrdialogs \
                --disable-infobars \
                --touch-events=enabled \
                http://localhost:8080
        " -- :0 -nocursor
    else
        # Running as root/sudo
        sudo -u joshbaker xinit /bin/bash -c "
            sleep 2
            chromium-browser \
                --kiosk \
                --no-sandbox \
                --disable-setuid-sandbox \
                --disable-dev-shm-usage \
                --disable-gpu \
                --window-size=800,480 \
                --noerrdialogs \
                --disable-infobars \
                --touch-events=enabled \
                http://localhost:8080
        " -- :0 -nocursor
    fi
else
    echo "DISPLAY already set to $DISPLAY"
    # Just launch browser
    chromium-browser \
        --kiosk \
        --no-sandbox \
        --disable-setuid-sandbox \
        --disable-dev-shm-usage \
        --disable-gpu \
        --window-size=800,480 \
        --noerrdialogs \
        --disable-infobars \
        --touch-events=enabled \
        http://localhost:8080
fi