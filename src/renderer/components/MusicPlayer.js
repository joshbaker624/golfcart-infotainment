import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Slider, 
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  Shuffle,
  Repeat,
  QueueMusic,
  MusicNote,
  Album,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4 minutes
  const [volume, setVolume] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Sunset Drive',
    artist: 'Golf Cart Vibes',
    album: 'Cruising Collection',
    artwork: null,
  });

  const playlist = [
    { title: 'Sunset Drive', artist: 'Golf Cart Vibes', duration: '4:00' },
    { title: 'Fairway Dreams', artist: 'Green Fields Band', duration: '3:24' },
    { title: 'Club House Jazz', artist: 'Smooth Swing', duration: '5:12' },
    { title: 'Morning Tee Time', artist: 'Early Birds', duration: '3:45' },
    { title: 'Back Nine Blues', artist: 'Birdie Brothers', duration: '4:30' },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTime(0);
    // In real app, would change track
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    // In real app, would change track
  };

  return (
    <Box sx={{ p: 4, height: '100%', display: 'flex', gap: 3 }}>
      {/* Main Player */}
      <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Music Player
        </Typography>

        <Paper
          sx={{
            flex: 1,
            p: 4,
            background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.1) 0%, rgba(0, 180, 216, 0.05) 100%)',
            border: '1px solid rgba(0, 180, 216, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Album Art */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Avatar
              sx={{
                width: 250,
                height: 250,
                mb: 4,
                background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
                boxShadow: '0 10px 40px rgba(0, 180, 216, 0.3)',
              }}
            >
              <Album sx={{ fontSize: 120, color: 'white' }} />
            </Avatar>
          </motion.div>

          {/* Track Info */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {currentTrack.title}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.7, mb: 4 }}>
            {currentTrack.artist}
          </Typography>

          {/* Progress Bar */}
          <Box sx={{ width: '100%', maxWidth: 400, mb: 2 }}>
            <Slider
              value={currentTime}
              max={duration}
              onChange={(e, value) => setCurrentTime(value)}
              sx={{
                color: '#00b4d8',
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">{formatTime(currentTime)}</Typography>
              <Typography variant="caption">{formatTime(duration)}</Typography>
            </Box>
          </Box>

          {/* Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <IconButton
              onClick={() => setShuffle(!shuffle)}
              sx={{ color: shuffle ? '#00b4d8' : 'white' }}
            >
              <Shuffle />
            </IconButton>
            
            <IconButton onClick={handlePrevious} size="large">
              <SkipPrevious sx={{ fontSize: 40 }} />
            </IconButton>
            
            <motion.div whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={handlePlayPause}
                sx={{
                  background: '#00b4d8',
                  color: 'white',
                  width: 70,
                  height: 70,
                  '&:hover': {
                    background: '#0096c7',
                  },
                }}
              >
                {isPlaying ? <Pause sx={{ fontSize: 40 }} /> : <PlayArrow sx={{ fontSize: 40 }} />}
              </IconButton>
            </motion.div>
            
            <IconButton onClick={handleNext} size="large">
              <SkipNext sx={{ fontSize: 40 }} />
            </IconButton>
            
            <IconButton
              onClick={() => setRepeat(!repeat)}
              sx={{ color: repeat ? '#00b4d8' : 'white' }}
            >
              <Repeat />
            </IconButton>
          </Box>

          {/* Volume */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', maxWidth: 300 }}>
            <VolumeUp sx={{ color: '#00b4d8' }} />
            <Slider
              value={volume}
              onChange={(e, value) => setVolume(value)}
              sx={{
                color: '#00b4d8',
                '& .MuiSlider-thumb': {
                  width: 14,
                  height: 14,
                },
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* Playlist */}
      <Paper
        sx={{
          flex: 1,
          p: 3,
          background: 'rgba(255, 255, 255, 0.05)',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <QueueMusic sx={{ color: '#00b4d8' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Playlist
          </Typography>
          <Chip label={`${playlist.length} tracks`} size="small" />
        </Box>

        <List>
          <AnimatePresence>
            {playlist.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem
                  button
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(0, 180, 216, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ width: 40, height: 40, background: '#00b4d8' }}>
                      <MusicNote />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={track.title}
                    secondary={track.artist}
                  />
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    {track.duration}
                  </Typography>
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Paper>
    </Box>
  );
};

export default MusicPlayer;