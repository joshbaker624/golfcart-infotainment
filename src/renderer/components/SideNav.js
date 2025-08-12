import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  DirectionsCar,
  MusicNote,
  Navigation,
  Bluetooth,
  Settings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/carplay', icon: DirectionsCar, label: 'CarPlay' },
    { path: '/music', icon: MusicNote, label: 'Music' },
    { path: '/navigation', icon: Navigation, label: 'Navigation' },
    { path: '/bluetooth', icon: Bluetooth, label: 'Bluetooth' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '40px',
        bottom: 0,
        width: '80px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
        gap: 2,
        zIndex: 999,
      }}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Tooltip key={item.path} title={item.label} placement="right">
            <Box sx={{ position: 'relative' }}>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  style={{
                    position: 'absolute',
                    left: -40,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: 40,
                    background: '#00ff88',
                    borderRadius: '0 4px 4px 0',
                  }}
                />
              )}
              <IconButton
                onClick={() => navigate(item.path)}
                sx={{
                  color: isActive ? '#00ff88' : 'rgba(255, 255, 255, 0.6)',
                  '&:hover': {
                    color: '#00ff88',
                    background: 'rgba(0, 255, 136, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Icon sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default SideNav;