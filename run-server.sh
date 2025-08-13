#!/bin/bash
# Run just the web server

cd /home/joshbaker/golfcart-infotainment

# Build if needed
if [ ! -f build/index.html ]; then
    echo "Building web version..."
    npm run build
fi

# Start server
echo "Starting web server on port 8080..."
echo "Access the infotainment system at: http://$(hostname -I | cut -d' ' -f1):8080"
cd build
python3 -m http.server 8080