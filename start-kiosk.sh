#!/bin/bash
# Golf Cart Infotainment Kiosk Mode for Terminal-Only Pi

# Install required packages if not present
if ! command -v xinit &> /dev/null; then
    echo "Installing required packages..."
    sudo apt update
    sudo apt install -y xorg xinit openbox
fi

# Disable screen blanking
setterm -blank 0 -powersave off

# Start X server with Electron app directly
xinit /bin/bash -c "
    # Disable screen saver
    xset s off
    xset -dpms
    xset s noblank
    
    # Hide cursor
    unclutter -idle 0 &
    
    # Start the app fullscreen
    cd /home/joshbaker/golfcart-infotainment
    npm start
" -- -nocursor -nolisten tcp vt$(fgconsole) > /dev/null 2>&1