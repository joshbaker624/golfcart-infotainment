# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Tasks

### Running the Application
- Development mode with hot reload: `npm run dev`
- Production build: `npm run build`
- Build for Raspberry Pi: `npm run build:pi`
- Start Electron app: `npm start`

### Testing
- Run tests: `npm test`
- No test framework is currently configured, but Jest is installed

## Architecture Overview

This is an Electron-based infotainment system designed for golf carts, featuring:

### Main Process (src/main/)
- `index.js`: Electron main process, window management, IPC handlers
- `preload.js`: Secure bridge between main and renderer processes
- Services:
  - `carplay.js`: CarPlay device detection and connection (mock implementation)
  - `bluetooth.js`: Bluetooth device management using noble (mock implementation)
  - `gps.js`: GPS data parsing and position tracking with SerialPort

### Renderer Process (src/renderer/)
- React 18 application with Material-UI and Framer Motion
- `App.js`: Main router and layout with animated transitions
- Components:
  - `Dashboard.js`: Main screen with system stats and quick actions
  - `CarPlayView.js`: CarPlay interface container
  - `MusicPlayer.js`: Audio playback with playlist management
  - `Navigation.js`: GPS mapping interface (requires Mapbox token)
  - `BluetoothManager.js`: Device pairing and management
  - `Settings.js`: System configuration and power options
  - `StatusBar.js`: Top bar with time and connection status
  - `SideNav.js`: Animated navigation menu

### Key Features
- Mock implementations for development without hardware
- Real hardware interfaces ready for:
  - SerialPort for GPS modules
  - Noble for Bluetooth (requires additional setup on Pi)
  - Node-carplay for CarPlay (requires additional setup)
- Responsive, touch-optimized UI with colorful gradients
- Automatic display sleep prevention on Linux

### Deployment Notes
- Configured for ARM7l architecture (Raspberry Pi)
- Electron Builder creates AppImage for Linux
- Display optimizations for fullscreen kiosk mode
- Auto-start scripts need to be configured on Pi