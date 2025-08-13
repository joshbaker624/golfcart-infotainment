const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { CarPlayService } = require('./services/carplay');
const { BluetoothService } = require('./services/bluetooth');
const { GPSService } = require('./services/gps');

let mainWindow;
let carplayService;
let bluetoothService;
let gpsService;

const isDev = process.argv.includes('--dev');

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: isDev ? 1024 : width,
    height: isDev ? 600 : height,
    fullscreen: !isDev,
    frame: isDev,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#000000',
    icon: path.join(__dirname, '../assets/icons/app-icon.png')
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../build/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  
  // Initialize services
  carplayService = new CarPlayService();
  bluetoothService = new BluetoothService();
  gpsService = new GPSService();
  
  // Start services
  carplayService.initialize();
  bluetoothService.initialize();
  gpsService.initialize();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Cleanup services
    if (carplayService) carplayService.cleanup();
    if (bluetoothService) bluetoothService.cleanup();
    if (gpsService) gpsService.cleanup();
    
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('get-system-info', async () => {
  return {
    platform: process.platform,
    version: app.getVersion(),
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node
  };
});

ipcMain.handle('carplay:status', async () => {
  return carplayService ? carplayService.getStatus() : { connected: false };
});

ipcMain.handle('bluetooth:scan', async () => {
  return bluetoothService ? bluetoothService.scan() : [];
});

ipcMain.handle('bluetooth:connect', async (event, deviceId) => {
  return bluetoothService ? bluetoothService.connect(deviceId) : false;
});

ipcMain.handle('gps:position', async () => {
  return gpsService ? gpsService.getCurrentPosition() : null;
});

// Prevent display sleep on Raspberry Pi
if (process.platform === 'linux') {
  const { exec } = require('child_process');
  exec('xset s off && xset -dpms && xset s noblank');
}