import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Bluetooth,
  BluetoothSearching,
  Headphones,
  Speaker,
  PhoneAndroid,
  Watch,
  Link,
  LinkOff,
  Refresh,
  SignalCellular4Bar,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const BluetoothManager = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadConnectedDevices();
  }, []);

  const loadConnectedDevices = async () => {
    // In real app, would load from bluetooth service
    setDevices([
      {
        id: '00:11:22:33:44:55',
        name: 'JBL Flip 5',
        type: 'speaker',
        connected: true,
        battery: 85,
        rssi: -45,
      },
    ]);
  };

  const scanForDevices = async () => {
    setScanning(true);
    
    if (window.electronAPI) {
      const foundDevices = await window.electronAPI.bluetooth.scan();
      setDevices(prev => {
        const connected = prev.filter(d => d.connected);
        return [...connected, ...foundDevices];
      });
    }
    
    setScanning(false);
  };

  const connectDevice = async (device) => {
    setConnecting(device.id);
    
    if (window.electronAPI) {
      const success = await window.electronAPI.bluetooth.connect(device.id);
      if (success) {
        setDevices(prev =>
          prev.map(d =>
            d.id === device.id ? { ...d, connected: true } : d
          )
        );
      }
    }
    
    setConnecting(null);
    setDialogOpen(false);
  };

  const disconnectDevice = async (device) => {
    if (window.electronAPI) {
      const success = await window.electronAPI.bluetooth.disconnect(device.id);
      if (success) {
        setDevices(prev =>
          prev.map(d =>
            d.id === device.id ? { ...d, connected: false } : d
          )
        );
      }
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'speaker':
        return Speaker;
      case 'headphones':
        return Headphones;
      case 'phone':
        return PhoneAndroid;
      case 'watch':
        return Watch;
      default:
        return Bluetooth;
    }
  };

  const getSignalStrength = (rssi) => {
    if (rssi > -50) return 'Excellent';
    if (rssi > -60) return 'Good';
    if (rssi > -70) return 'Fair';
    return 'Poor';
  };

  const getSignalColor = (rssi) => {
    if (rssi > -50) return '#00ff88';
    if (rssi > -60) return '#ffbe0b';
    if (rssi > -70) return '#ff6b6b';
    return '#ff006e';
  };

  return (
    <Box sx={{ p: 4, height: '100%', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Bluetooth Devices
        </Typography>
        
        <Button
          variant="contained"
          startIcon={scanning ? <CircularProgress size={20} color="inherit" /> : <BluetoothSearching />}
          onClick={scanForDevices}
          disabled={scanning}
          sx={{
            background: '#00b4d8',
            '&:hover': {
              background: '#0096c7',
            },
          }}
        >
          {scanning ? 'Scanning...' : 'Scan for Devices'}
        </Button>
      </Box>

      {/* Connected Devices */}
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Connected Devices
        </Typography>
        
        <List>
          <AnimatePresence>
            {devices.filter(d => d.connected).map((device) => {
              const Icon = getDeviceIcon(device.type);
              
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <ListItem
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      background: 'rgba(0, 255, 136, 0.05)',
                      border: '1px solid rgba(0, 255, 136, 0.3)',
                    }}
                  >
                    <ListItemIcon>
                      <Icon sx={{ color: '#00ff88' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={device.name}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            size="small"
                            label="Connected"
                            sx={{
                              background: 'rgba(0, 255, 136, 0.2)',
                              color: '#00ff88',
                            }}
                          />
                          {device.battery && (
                            <Chip
                              size="small"
                              label={`${device.battery}% Battery`}
                            />
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => disconnectDevice(device)}
                        sx={{ color: '#ff006e' }}
                      >
                        <LinkOff />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </List>
        
        {devices.filter(d => d.connected).length === 0 && (
          <Typography variant="body2" sx={{ opacity: 0.5, textAlign: 'center', py: 2 }}>
            No connected devices
          </Typography>
        )}
      </Paper>

      {/* Available Devices */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Available Devices
        </Typography>
        
        <List>
          <AnimatePresence>
            {devices.filter(d => !d.connected).map((device, index) => {
              const Icon = getDeviceIcon(device.type);
              
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem
                    button
                    onClick={() => {
                      setSelectedDevice(device);
                      setDialogOpen(true);
                    }}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        background: 'rgba(0, 180, 216, 0.1)',
                        borderColor: '#00b4d8',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Icon sx={{ opacity: 0.7 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={device.name}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <SignalCellular4Bar
                            sx={{
                              fontSize: 16,
                              color: getSignalColor(device.rssi),
                            }}
                          />
                          <Typography variant="caption">
                            {getSignalStrength(device.rssi)}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDevice(device);
                          setDialogOpen(true);
                        }}
                        disabled={connecting === device.id}
                      >
                        {connecting === device.id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Link />
                        )}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </List>
        
        {devices.filter(d => !d.connected).length === 0 && !scanning && (
          <Typography variant="body2" sx={{ opacity: 0.5, textAlign: 'center', py: 2 }}>
            No available devices. Click scan to search.
          </Typography>
        )}
      </Paper>

      {/* Connect Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Connect to Device</DialogTitle>
        <DialogContent>
          <Typography>
            Do you want to connect to {selectedDevice?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => connectDevice(selectedDevice)}
            variant="contained"
            disabled={connecting}
            sx={{
              background: '#00b4d8',
              '&:hover': {
                background: '#0096c7',
              },
            }}
          >
            {connecting ? 'Connecting...' : 'Connect'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BluetoothManager;