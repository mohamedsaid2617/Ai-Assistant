// src/components/StatusIndicator/index.jsx
import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const StatusIndicator = ({ isProcessing }) => {
  if (!isProcessing) return null;

  return (
    <Box className="status-indicator">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="caption">
          Processing your request...
        </Typography>
      </Box>
      <LinearProgress color="secondary" sx={{ mt: 1 }} />
    </Box>
  );
};

export default StatusIndicator;