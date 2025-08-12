import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Speed,
  Battery90,
  Thermostat,
  DirectionsCar,
  MusicNote,
  Bluetooth,
  GpsFixed,
} from '@mui/icons-material';

const DashboardCard = ({ icon: Icon, title, value, unit, color, progress }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Paper
      sx={{
        p: 3,
        height: '100%',
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        border: `1px solid ${color}40`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ fontSize: 32, color, mr: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      
      <Typography variant="h3" sx={{ fontWeight: 700, color }}>
        {value}
        <Typography component="span" variant="h5" sx={{ ml: 1, opacity: 0.7 }}>
          {unit}
        </Typography>
      </Typography>
      
      {progress !== undefined && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mt: 2,
            height: 6,
            borderRadius: 3,
            backgroundColor: `${color}20`,
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
              borderRadius: 3,
            },
          }}
        />
      )}
    </Paper>
  </motion.div>
);

const Dashboard = () => {
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(85);
  const [temperature, setTemperature] = useState(72);
  const [gpsStatus, setGpsStatus] = useState('Active');

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setSpeed(prev => {
        const newSpeed = prev + (Math.random() - 0.5) * 2;
        return Math.max(0, Math.min(15, newSpeed));
      });
      
      setBattery(prev => Math.max(0, prev - 0.01));
      setTemperature(prev => prev + (Math.random() - 0.5) * 0.5);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dashboardItems = [
    {
      icon: Speed,
      title: 'Speed',
      value: speed.toFixed(1),
      unit: 'mph',
      color: '#00ff88',
      progress: (speed / 15) * 100,
    },
    {
      icon: Battery90,
      title: 'Battery',
      value: battery.toFixed(0),
      unit: '%',
      color: battery > 20 ? '#00ff88' : '#ff006e',
      progress: battery,
    },
    {
      icon: Thermostat,
      title: 'Temperature',
      value: temperature.toFixed(0),
      unit: '°F',
      color: '#00b4d8',
    },
    {
      icon: GpsFixed,
      title: 'GPS Status',
      value: gpsStatus,
      unit: '',
      color: '#ffbe0b',
    },
  ];

  const quickActions = [
    { icon: DirectionsCar, label: 'CarPlay', path: '/carplay', color: '#ff006e' },
    { icon: MusicNote, label: 'Music', path: '/music', color: '#00b4d8' },
    { icon: Bluetooth, label: 'Bluetooth', path: '/bluetooth', color: '#00ff88' },
  ];

  return (
    <Box sx={{ p: 4, height: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Quick Actions
        </Typography>
        
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    background: `linear-gradient(135deg, ${action.color}20 0%, transparent 100%)`,
                    border: `1px solid ${action.color}40`,
                    '&:hover': {
                      borderColor: action.color,
                    },
                  }}
                  onClick={() => window.location.hash = action.path}
                >
                  <action.icon sx={{ fontSize: 48, color: action.color, mb: 2 }} />
                  <Typography variant="h6">{action.label}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Paper
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            System Status
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Uptime
              </Typography>
              <Typography variant="h6">2h 34m</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Last Service
              </Typography>
              <Typography variant="h6">3 days ago</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;