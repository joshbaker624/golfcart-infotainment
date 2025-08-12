import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { Search, NavigationOutlined, LocationOn, AccessTime, TrendingUp } from '@mui/icons-material';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Navigation = () => {
  const [viewport, setViewport] = useState({
    latitude: 33.7490,
    longitude: -84.3880,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    // Get GPS position
    updatePosition();
    const interval = setInterval(updatePosition, 5000);
    return () => clearInterval(interval);
  }, []);

  const updatePosition = async () => {
    if (window.electronAPI) {
      const pos = await window.electronAPI.gps.getCurrentPosition();
      if (pos) {
        setCurrentPosition(pos);
        setViewport(prev => ({
          ...prev,
          latitude: pos.latitude,
          longitude: pos.longitude
        }));
      }
    }
  };

  const savedLocations = [
    { name: 'Club House', distance: '0.5 mi', time: '2 min', icon: LocationOn },
    { name: 'Pro Shop', distance: '0.8 mi', time: '3 min', icon: LocationOn },
    { name: 'Driving Range', distance: '1.2 mi', time: '5 min', icon: LocationOn },
    { name: 'Restaurant', distance: '0.3 mi', time: '1 min', icon: LocationOn },
  ];

  const handleSearch = () => {
    // In real app, would search for location
    console.log('Searching for:', searchQuery);
  };

  return (
    <Box sx={{ p: 4, height: '100%', display: 'flex', gap: 3 }}>
      {/* Map */}
      <Paper
        sx={{
          flex: 2,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 2,
        }}
      >
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Map would be rendered here */}
          {/* In production, you'd need a Mapbox token */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ opacity: 0.5 }}>
              Map View (Mapbox token required)
            </Typography>
          </Box>

          {/* Current Position Indicator */}
          {currentPosition && (
            <Paper
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                p: 2,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NavigationOutlined sx={{ color: '#00ff88' }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Current Speed
                  </Typography>
                  <Typography variant="h6">
                    {currentPosition.speed?.toFixed(1) || '0.0'} mph
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
      </Paper>

      {/* Controls */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Navigation
        </Typography>

        {/* Search */}
        <Paper sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, opacity: 0.5 }} />,
              endAdornment: (
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={handleSearch}
                  sx={{ 
                    background: '#00ff88',
                    color: 'black',
                    '&:hover': {
                      background: '#00cc66',
                    }
                  }}
                >
                  Go
                </Button>
              ),
            }}
          />
        </Paper>

        {/* Saved Locations */}
        <Paper sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Destinations
          </Typography>
          
          <List>
            {savedLocations.map((location, index) => (
              <ListItem
                key={index}
                button
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(0, 255, 136, 0.1)',
                    borderColor: '#00ff88',
                  },
                }}
              >
                <ListItemIcon>
                  <location.icon sx={{ color: '#00ff88' }} />
                </ListItemIcon>
                <ListItemText
                  primary={location.name}
                  secondary={
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip
                        size="small"
                        icon={<TrendingUp sx={{ fontSize: 14 }} />}
                        label={location.distance}
                      />
                      <Chip
                        size="small"
                        icon={<AccessTime sx={{ fontSize: 14 }} />}
                        label={location.time}
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Navigation Status */}
        {destination && (
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
              border: '1px solid #00ff88',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Navigating to {destination.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Distance: {destination.distance}</Typography>
              <Typography variant="body2">ETA: {destination.time}</Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => setDestination(null)}
            >
              Cancel Navigation
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Navigation;