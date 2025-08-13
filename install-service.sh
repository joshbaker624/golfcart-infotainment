#!/bin/bash
# Install systemd service for auto-start

echo "Installing Golf Cart Infotainment service..."

# Copy service file
sudo cp golfcart.service /etc/systemd/system/

# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable golfcart.service

echo "Service installed!"
echo ""
echo "Commands:"
echo "  Start now:    sudo systemctl start golfcart"
echo "  Stop:         sudo systemctl stop golfcart"
echo "  Status:       sudo systemctl status golfcart"
echo "  View logs:    sudo journalctl -u golfcart -f"
echo "  Disable:      sudo systemctl disable golfcart"
echo ""
echo "The system will auto-start on boot."