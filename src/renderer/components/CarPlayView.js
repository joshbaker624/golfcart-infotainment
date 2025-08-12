import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { PhoneIphone, DirectionsCar, CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const CarPlayView = () => {
  const [carplayStatus, setCarplayStatus] = useState({ connected: false, device: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkCarPlayStatus();
    
    if (window.electronAPI) {
      window.electronAPI.carplay.onStatusChange((event, status) => {
        setCarplayStatus(status);
      });
    }
  }, []);

  const checkCarPlayStatus = async () => {
    setLoading(true);
    if (window.electronAPI) {
      const status = await window.electronAPI.carplay.getStatus();
      setCarplayStatus(status);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!carplayStatus.connected) {
    return (
      <Box sx={{ 
        p: 4, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(255, 0, 110, 0.05) 100%)',
              border: '2px solid rgba(255, 0, 110, 0.3)',
              maxWidth: 500,
            }}
          >
            <PhoneIphone sx={{ fontSize: 80, color: '#ff006e', mb: 3 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              Connect Your iPhone
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
              Please connect your iPhone using a Lightning cable to enable CarPlay
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: '#00ff88' }} />
                <Typography>iPhone 8 or newer required</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: '#00ff88' }} />
                <Typography>iOS 13.0 or later</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: '#00ff88' }} />
                <Typography>Use original or MFi-certified cable</Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              size="large"
              sx={{ mt: 4 }}
              onClick={checkCarPlayStatus}
            >
              Check Connection
            </Button>
          </Paper>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#000',
    }}>
      <Box sx={{ 
        p: 2, 
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <DirectionsCar sx={{ color: '#ff006e' }} />
        <Typography variant="h6">
          CarPlay - {carplayStatus.device?.name || 'Connected'}
        </Typography>
      </Box>
      
      <Box sx={{ 
        flex: 1, 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#000',
      }}>
        {/* CarPlay content would be rendered here */}
        {/* In a real implementation, this would show the CarPlay interface */}
        <Typography variant="h5" sx={{ opacity: 0.5 }}>
          CarPlay Interface Active
        </Typography>
      </Box>
    </Box>
  );
};

export default CarPlayView;