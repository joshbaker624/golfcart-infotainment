#!/bin/bash
# Production startup script for Golf Cart Infotainment

echo "Starting Golf Cart Infotainment System..."

# Ensure proper permissions on Electron files
cd /home/joshbaker/golfcart-infotainment
chmod -R 755 node_modules/electron/dist/

# Kill any existing X sessions
sudo pkill -9 Xorg 2>/dev/null || true
sleep 2

# Start X server with the app
sudo -E xinit /bin/bash -c "
    # Set proper permissions for the user
    xhost +local:joshbaker
    
    # Disable screen saver and blanking
    xset s off
    xset -dpms
    xset s noblank
    
    # Run the app as the normal user with all GPU features disabled
    su - joshbaker -c 'export DISPLAY=:0 && cd /home/joshbaker/golfcart-infotainment && npm start -- --no-sandbox --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage --use-gl=swiftshader --disable-features=VizDisplayCompositor'
" -- :0 -nocursor -nolisten tcp vt7