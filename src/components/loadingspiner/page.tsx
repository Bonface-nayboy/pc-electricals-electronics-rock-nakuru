import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner: React.FC<{ onTimeout?: () => void }> = ({ onTimeout }) => {
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
      if (onTimeout) onTimeout();
    }, 10000); // 5 seconds timeout

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [onTimeout]);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress
        size={40}
        sx={{ color: 'grey.400', position: 'absolute', zIndex: 1 }}
      />
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '4px dotted grey',
          borderTopColor: 'transparent',
          position: 'relative',
        }}
      />
      {timeoutReached && (
        <Typography
          variant="caption"
          sx={{ position: 'absolute', top: '100%', marginTop: '8px' }}
        >
          Taking longer than expected...
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
