#!/bin/bash
# Framebuffer startup script - uses legacy X11 driver

echo "Starting Golf Cart Infotainment (Framebuffer mode)..."

# Kill any existing X sessions
sudo pkill -9 Xorg 2>/dev/null || true
sleep 2

# Create a minimal xorg.conf for framebuffer
sudo tee /tmp/xorg.conf > /dev/null << 'EOF'
Section "Device"
    Identifier "Framebuffer"
    Driver "fbdev"
    Option "fbdev" "/dev/fb0"
EndSection

Section "Screen"
    Identifier "Screen0"
    Device "Framebuffer"
    DefaultDepth 16
    SubSection "Display"
        Depth 16
        Modes "1024x600"
    EndSubSection
EndSection

Section "ServerLayout"
    Identifier "Layout0"
    Screen "Screen0"
EndSection

Section "ServerFlags"
    Option "BlankTime" "0"
    Option "StandbyTime" "0"
    Option "SuspendTime" "0"
    Option "OffTime" "0"
EndSection
EOF

# Start X with framebuffer driver
sudo xinit /bin/bash -c "
    # Allow connections
    xhost +local:
    
    # No compositing or effects
    xset s off
    xset -dpms
    
    # Set background to black
    xsetroot -solid black
    
    # Run the app with minimal features
    su - joshbaker -c 'export DISPLAY=:0 && cd /home/joshbaker/golfcart-infotainment && npm start -- --no-sandbox --disable-gpu --in-process-gpu --disable-gpu-compositing --disable-accelerated-2d-canvas --disable-accelerated-jpeg-decoding --disable-accelerated-mjpeg-decode --disable-accelerated-video-decode --disable-gpu-memory-buffer-compositor-resources --disable-gpu-memory-buffer-video-frames --use-fake-ui-for-media-stream --disable-webgl --disable-threaded-animation --disable-threaded-scrolling --disable-checker-imaging'
" -- -config /tmp/xorg.conf :0 -nocursor