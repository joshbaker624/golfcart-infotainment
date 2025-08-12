const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  carplay: {
    getStatus: () => ipcRenderer.invoke('carplay:status'),
    onStatusChange: (callback) => ipcRenderer.on('carplay:status-changed', callback)
  },
  
  bluetooth: {
    scan: () => ipcRenderer.invoke('bluetooth:scan'),
    connect: (deviceId) => ipcRenderer.invoke('bluetooth:connect', deviceId),
    disconnect: (deviceId) => ipcRenderer.invoke('bluetooth:disconnect', deviceId),
    onDeviceConnected: (callback) => ipcRenderer.on('bluetooth:device-connected', callback),
    onDeviceDisconnected: (callback) => ipcRenderer.on('bluetooth:device-disconnected', callback)
  },
  
  gps: {
    getCurrentPosition: () => ipcRenderer.invoke('gps:position'),
    onPositionUpdate: (callback) => ipcRenderer.on('gps:position-update', callback)
  },
  
  media: {
    play: () => ipcRenderer.invoke('media:play'),
    pause: () => ipcRenderer.invoke('media:pause'),
    next: () => ipcRenderer.invoke('media:next'),
    previous: () => ipcRenderer.invoke('media:previous'),
    setVolume: (volume) => ipcRenderer.invoke('media:set-volume', volume),
    onTrackChange: (callback) => ipcRenderer.on('media:track-changed', callback)
  }
});