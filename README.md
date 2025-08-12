# Golf Cart Infotainment System

A modern, colorful infotainment system for EZ-GO TXT golf carts with CarPlay support, built using Electron and React.

## Features

- **CarPlay Support** - Wired CarPlay integration for iPhone users
- **Bluetooth Connectivity** - Connect speakers, headphones, and other devices
- **Music Player** - Built-in music player with playlist support
- **GPS Navigation** - Real-time GPS tracking and navigation
- **Modern UI** - Colorful, animated interface optimized for touch screens
- **System Monitoring** - Speed, battery, temperature tracking
- **Raspberry Pi Ready** - Optimized for deployment on Raspberry Pi

## Requirements

- Raspberry Pi 4 (4GB+ recommended)
- 7-10" touchscreen display
- USB cable for CarPlay
- GPS module (optional)
- Bluetooth adapter (if not built-in)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/golfcart-infotainment.git
cd golfcart-infotainment
```

2. Install dependencies:
```bash
npm install
```

3. Development mode:
```bash
npm run dev
```

4. Build for Raspberry Pi:
```bash
npm run build:pi
```

## Deployment to Raspberry Pi

1. Install Raspberry Pi OS (64-bit recommended)
2. Enable auto-login and set display to never sleep
3. Install Node.js and npm
4. Copy the built application to Pi
5. Set up auto-start on boot

## Hardware Setup

### Display
- Connect touchscreen via HDMI and USB
- Configure touch input in Raspberry Pi settings

### CarPlay
- Use a powered USB hub if needed
- Connect iPhone with MFi-certified cable
- CarPlay will auto-detect when connected

### GPS Module
- Connect GPS module to USB or GPIO pins
- Default baud rate: 9600
- Supports NMEA protocol

### Bluetooth
- Built-in Raspberry Pi Bluetooth or USB adapter
- Enable in Raspberry Pi settings

## Configuration

Edit `src/config.js` to customize:
- Default theme colors
- GPS settings
- Audio preferences
- Display timeout

## License

MIT License