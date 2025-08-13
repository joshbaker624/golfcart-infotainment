#!/bin/bash
# Check display configuration

echo "=== Display Configuration Check ==="

echo -e "\n1. Current user and groups:"
whoami
groups

echo -e "\n2. Console users:"
who

echo -e "\n3. Video group members:"
getent group video

echo -e "\n4. Framebuffer permissions:"
ls -la /dev/fb*

echo -e "\n5. X lock files:"
ls -la /tmp/.X* 2>/dev/null || echo "No X lock files"

echo -e "\n6. Current DISPLAY:"
echo "DISPLAY=$DISPLAY"

echo -e "\n7. Check if can access framebuffer:"
if [ -r /dev/fb0 ] && [ -w /dev/fb0 ]; then
    echo "Framebuffer is accessible"
else
    echo "Cannot access framebuffer - may need to add user to video group"
    echo "Run: sudo usermod -a -G video $USER"
fi

echo -e "\n8. systemd graphical target:"
systemctl get-default

echo -e "\n9. Check for desktop environment:"
if systemctl is-active --quiet lightdm; then
    echo "LightDM is running"
elif systemctl is-active --quiet gdm3; then
    echo "GDM3 is running"  
else
    echo "No desktop manager running"
fi