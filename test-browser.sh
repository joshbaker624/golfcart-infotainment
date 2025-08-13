#!/bin/bash
# Test browsers without X

echo "Testing browsers..."

# Test if chromium works at all
echo "1. Testing chromium headless:"
chromium-browser --headless --disable-gpu --dump-dom http://localhost:8080 2>&1 | head -20

echo -e "\n2. Chromium version:"
chromium-browser --version

echo -e "\n3. Check for crashes:"
ls -la ~/.config/chromium/Crash\ Reports/ 2>/dev/null || echo "No crash reports"

echo -e "\n4. Test with xvfb (virtual display):"
if ! command -v xvfb-run &> /dev/null; then
    echo "Installing xvfb..."
    sudo apt install -y xvfb
fi

echo "Starting virtual display test..."
xvfb-run -a -s "-screen 0 800x480x16" chromium-browser --no-sandbox --disable-gpu http://localhost:8080 &
XVFB_PID=$!
sleep 5
ps aux | grep chromium
kill $XVFB_PID 2>/dev/null