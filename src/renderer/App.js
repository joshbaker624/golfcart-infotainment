import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import CarPlayView from './components/CarPlayView';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import BluetoothManager from './components/BluetoothManager';
import StatusBar from './components/StatusBar';
import SideNav from './components/SideNav';

function AppContent() {
  const [carplayConnected, setCarplayConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check CarPlay status
    checkCarPlayStatus();
    
    // Set up event listeners
    if (window.electronAPI) {
      window.electronAPI.carplay.onStatusChange((event, status) => {
        setCarplayConnected(status.connected);
        if (status.connected) {
          navigate('/carplay');
        }
      });
    }
  }, [navigate]);

  const checkCarPlayStatus = async () => {
    if (window.electronAPI) {
      const status = await window.electronAPI.carplay.getStatus();
      setCarplayConnected(status.connected);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2a 100%)',
      overflow: 'hidden'
    }}>
      <StatusBar />
      <SideNav />
      
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: '80px',
        paddingTop: '40px'
      }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <Dashboard />
              </motion.div>
            } />
            <Route path="/carplay" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <CarPlayView />
              </motion.div>
            } />
            <Route path="/music" element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <MusicPlayer />
              </motion.div>
            } />
            <Route path="/navigation" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <Navigation />
              </motion.div>
            } />
            <Route path="/bluetooth" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <BluetoothManager />
              </motion.div>
            } />
            <Route path="/settings" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <Settings />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;