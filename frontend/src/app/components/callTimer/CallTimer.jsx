import { Box, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';

const CallTimer = ({time,setTime}) => {
    const [running, setRunning] = useState(true);

    useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1000);
        }, 1000);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);
    return (
        <Box className="timer-container">
          <Typography variant="subtitle1" color="white">{new Date(time).toISOString().slice(11, 19)}</Typography>
        </Box>
    );
}

export default CallTimer