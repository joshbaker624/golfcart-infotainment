#!/bin/bash
# Debug display issues

echo "=== Display Debug Info ==="

# Check display status
echo "1. Checking video output:"
tvservice -s

# Check framebuffer
echo -e "\n2. Framebuffer info:"
fbset -i

# Check for HDMI
echo -e "\n3. HDMI status:"
tvservice -m CEA && tvservice -m DMT

# Check current resolution
echo -e "\n4. Current mode:"
tvservice -s

# Try to force HDMI on
echo -e "\n5. Forcing HDMI on:"
tvservice -p
fbset -depth 16

echo -e "\n6. Testing basic X:"
echo "Run: sudo X :0"
echo "If you see a gray screen with an X cursor, press Ctrl+Alt+Backspace to exit"