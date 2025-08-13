#!/bin/bash
# Test script to check display setup

echo "=== Display Test Script ==="
echo "Checking environment..."

# Check if X is installed
if command -v xinit &> /dev/null; then
    echo "✓ X server is installed"
else
    echo "✗ X server not found. Installing..."
    sudo apt update
    sudo apt install -y xorg xinit openbox
fi

# Check current display
echo "Current DISPLAY: $DISPLAY"
echo "SSH session: ${SSH_TTY:-none}"

# Check if any X server is running
if pgrep -x Xorg > /dev/null; then
    echo "✓ X server is running"
    ps aux | grep Xorg | grep -v grep
else
    echo "✗ No X server running"
fi

# Check framebuffer
if [ -e /dev/fb0 ]; then
    echo "✓ Framebuffer device found: /dev/fb0"
else
    echo "✗ No framebuffer device found"
fi

# Test X server startup
echo ""
echo "Testing X server startup..."
echo "Run this command to test: sudo xinit -- :1 -nolisten tcp"
echo "Press Ctrl+Alt+Backspace to exit the test"