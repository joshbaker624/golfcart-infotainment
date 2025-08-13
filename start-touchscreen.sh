#!/bin/bash
# Startup script for Raspberry Pi 7" Touch Display

echo "Starting Golf Cart Infotainment on Pi Touch Display..."

# Kill any existing X sessions
sudo pkill -9 Xorg 2>/dev/null || true
sleep 2

# Set up touchscreen rotation if needed (0, 90, 180, 270)
# export DISPLAY=:0
# xrandr --output DSI-1 --rotate normal

# Create xorg.conf for the touchscreen
sudo tee /tmp/xorg-touch.conf > /dev/null << 'EOF'
Section "Device"
    Identifier "Touchscreen"
    Driver "modesetting"
    Option "AccelMethod" "none"
EndSection

Section "Screen"
    Identifier "Screen0"
    Device "Touchscreen"
    DefaultDepth 24
    SubSection "Display"
        Depth 24
    EndSubSection
EndSection

Section "InputClass"
    Identifier "calibration"
    MatchProduct "FT5406 memory based driver"
    Option "InvertX" "false"
    Option "InvertY" "false"
EndSection

Section "ServerFlags"
    Option "BlankTime" "0"
    Option "StandbyTime" "0"
    Option "SuspendTime" "0"
    Option "OffTime" "0"
EndSection
EOF

# Start X with the app
sudo xinit /bin/bash -c "
    # Set permissions
    xhost +local:
    
    # Disable screen blanking
    xset s off
    xset -dpms
    xset s noblank
    
    # Set touchscreen calibration if needed
    export DISPLAY=:0
    
    # Run the app (try web mode first as it's more stable)
    if [ -f /home/joshbaker/golfcart-infotainment/build/index.html ]; then
        echo 'Running in web mode...'
        cd /home/joshbaker/golfcart-infotainment/build
        python3 -m http.server 8080 &
        sleep 3
        su - joshbaker -c 'chromium-browser --kiosk --noerrdialogs --disable-infobars --no-first-run --disable-translate --disable-features=TranslateUI --touch-events=enabled --enable-touch-drag-drop --enable-viewport --overscroll-history-navigation=0 http://localhost:8080'
    else
        echo 'Running Electron app...'
        su - joshbaker -c 'cd /home/joshbaker/golfcart-infotainment && npm start -- --no-sandbox --disable-gpu --disable-software-rasterizer'
    fi
" -- -config /tmp/xorg-touch.conf :0 -nocursor