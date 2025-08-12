import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  Slider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  Brightness6,
  VolumeUp,
  Wifi,
  Language,
  Update,
  Info,
  PowerSettingsNew,
  RestartAlt,
  Storage,
  Memory,
} from '@mui/icons-material';

const Settings = () => {
  const [brightness, setBrightness] = useState(70);
  const [volume, setVolume] = useState(50);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [systemInfo, setSystemInfo] = useState(null);

  React.useEffect(() => {
    loadSystemInfo();
  }, []);

  const loadSystemInfo = async () => {
    if (window.electronAPI) {
      const info = await window.electronAPI.getSystemInfo();
      setSystemInfo(info);
    }
  };

  const handleRestart = () => {
    if (window.confirm('Are you sure you want to restart the system?')) {
      // In real app, would restart the system
      console.log('Restarting system...');
    }
  };

  const handleShutdown = () => {
    if (window.confirm('Are you sure you want to shut down?')) {
      // In real app, would shut down the system
      console.log('Shutting down...');
    }
  };

  return (
    <Box sx={{ p: 4, height: '100%', overflow: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Settings
      </Typography>

      {/* Display Settings */}
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Display & Audio
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <Brightness6 />
            </ListItemIcon>
            <ListItemText
              primary="Screen Brightness"
              secondary={`${brightness}%`}
            />
            <Box sx={{ width: 200 }}>
              <Slider
                value={brightness}
                onChange={(e, value) => setBrightness(value)}
                sx={{ color: '#ffbe0b' }}
              />
            </Box>
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <VolumeUp />
            </ListItemIcon>
            <ListItemText
              primary="System Volume"
              secondary={`${volume}%`}
            />
            <Box sx={{ width: 200 }}>
              <Slider
                value={volume}
                onChange={(e, value) => setVolume(value)}
                sx={{ color: '#00b4d8' }}
              />
            </Box>
          </ListItem>
        </List>
      </Paper>

      {/* System Settings */}
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          System Preferences
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="Language" />
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                size="small"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          
          <Divider sx={{ my: 1 }} />
          
          <ListItem>
            <ListItemIcon>
              <Update />
            </ListItemIcon>
            <ListItemText
              primary="Auto Update"
              secondary="Automatically install system updates"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      {/* System Info */}
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          System Information
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText
              primary="Version"
              secondary={systemInfo?.version || '1.0.0'}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <Memory />
            </ListItemIcon>
            <ListItemText
              primary="Platform"
              secondary={systemInfo?.platform || 'Raspberry Pi'}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <Storage />
            </ListItemIcon>
            <ListItemText
              primary="Storage"
              secondary="12.5 GB / 32 GB"
            />
            <Chip
              label="39% Used"
              size="small"
              sx={{
                background: 'rgba(0, 255, 136, 0.2)',
                color: '#00ff88',
              }}
            />
          </ListItem>
        </List>
      </Paper>

      {/* Power Options */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Power Options
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RestartAlt />}
            onClick={handleRestart}
            sx={{
              borderColor: '#ffbe0b',
              color: '#ffbe0b',
              '&:hover': {
                borderColor: '#ffbe0b',
                background: 'rgba(255, 190, 11, 0.1)',
              },
            }}
          >
            Restart System
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<PowerSettingsNew />}
            onClick={handleShutdown}
            color="error"
          >
            Shut Down
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;