#!/bin/bash
# Setup auto-start for Golf Cart Infotainment on terminal-only Pi

echo "Setting up auto-start for Golf Cart Infotainment..."

# Create systemd service
sudo tee /etc/systemd/system/golfcart-infotainment.service > /dev/null << EOF
[Unit]
Description=Golf Cart Infotainment System
After=multi-user.target

[Service]
Type=simple
ExecStart=/home/joshbaker/golfcart-infotainment/start-kiosk.sh
Restart=always
User=joshbaker
Group=joshbaker
Environment="HOME=/home/joshbaker"

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
sudo systemctl daemon-reload
sudo systemctl enable golfcart-infotainment.service

echo "Service installed. The infotainment system will start on boot."
echo "To start now: sudo systemctl start golfcart-infotainment"
echo "To check status: sudo systemctl status golfcart-infotainment"
echo "To view logs: journalctl -u golfcart-infotainment -f"