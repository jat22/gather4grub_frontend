import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component='footer' sx={{ 
		py:6
		}}>
      <Typography variant="subtitle2" align="center">
        © 2023 Gather4Grub
      </Typography>
    </Box>
  );
};

export default Footer;