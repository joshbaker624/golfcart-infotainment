#!/bin/bash
# Check memory and swap

echo "=== Memory Status ==="
echo "1. RAM Usage:"
free -h

echo -e "\n2. Swap status:"
swapon --show

echo -e "\n3. Memory info:"
cat /proc/meminfo | grep -E "MemTotal|MemFree|MemAvailable|SwapTotal|SwapFree"

echo -e "\n4. Largest processes:"
ps aux --sort=-%mem | head -10

echo -e "\n5. Checking if we need swap..."
TOTAL_MEM=$(grep MemTotal /proc/meminfo | awk '{print $2}')
SWAP_TOTAL=$(grep SwapTotal /proc/meminfo | awk '{print $2}')

if [ "$SWAP_TOTAL" -eq "0" ]; then
    echo "WARNING: No swap configured!"
    echo "Chromium needs swap on low-memory systems."
    echo ""
    echo "To add 1GB swap:"
    echo "  sudo fallocate -l 1G /swapfile"
    echo "  sudo chmod 600 /swapfile"
    echo "  sudo mkswap /swapfile"
    echo "  sudo swapon /swapfile"
    echo "  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab"
fi