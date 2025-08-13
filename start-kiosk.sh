#!/bin/bash
# Golf Cart Infotainment Kiosk Mode for Terminal-Only Pi

# Install required packages if not present
if ! command -v xinit &> /dev/null; then
    echo "Installing required packages..."
    sudo apt update
    sudo apt install -y xorg xinit openbox unclutter
fi

# Check if we're on a real console or SSH
if [ -n "$SSH_TTY" ]; then
    echo "Running from SSH session..."
    # For SSH, we need to specify the display
    export DISPLAY=:0
else
    # Disable screen blanking only on real console
    setterm -blank 0 -powersave off 2>/dev/null || true
fi

# Kill any existing X sessions
sudo pkill -9 Xorg 2>/dev/null || true
sleep 2

# Start X server with Electron app directly
if [ -n "$SSH_TTY" ]; then
    # From SSH: start on the physical display
    sudo xinit /bin/bash -c "
        # Allow connections
        xhost +local:
        
        # Disable screen saver
        xset s off
        xset -dpms
        xset s noblank
        
        # Hide cursor (if available)
        unclutter -idle 0 2>/dev/null &
        
        # Start the app fullscreen as the correct user with no-sandbox flag
        su - joshbaker -c 'cd /home/joshbaker/golfcart-infotainment && npm start -- --no-sandbox'
    " -- :0 -nocursor -nolisten tcp vt7
else
    # From console: normal start
    xinit /bin/bash -c "
        # Disable screen saver
        xset s off
        xset -dpms
        xset s noblank
        
        # Hide cursor (if available)
        unclutter -idle 0 2>/dev/null &
        
        # Start the app fullscreen
        cd /home/joshbaker/golfcart-infotainment
        npm start -- --no-sandbox
    " -- -nocursor -nolisten tcp
fi