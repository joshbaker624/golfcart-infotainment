import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Bluetooth,
  BluetoothDisabled,
  GpsFixed,
  GpsOff,
  BatteryFull,
  SignalCellular4Bar,
  AccessTime
} from '@mui/icons-material';

const StatusBar = () => {
  const [time, setTime] = useState(new Date());
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#00ff88' }}>
          Golf Cart OS
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {bluetoothConnected ? (
            <Bluetooth sx={{ fontSize: 18, color: '#00b4d8' }} />
          ) : (
            <BluetoothDisabled sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.3)' }} />
          )}
          
          {gpsActive ? (
            <GpsFixed sx={{ fontSize: 18, color: '#00ff88' }} />
          ) : (
            <GpsOff sx={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.3)' }} />
          )}
          
          <SignalCellular4Bar sx={{ fontSize: 18 }} />
          <BatteryFull sx={{ fontSize: 18, color: '#00ff88' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime sx={{ fontSize: 16 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {formatTime(time)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatusBar;