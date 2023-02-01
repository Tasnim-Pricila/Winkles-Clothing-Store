import { Box, Typography } from '@mui/material';
import React from 'react';
import Footer from '../../shared/Footer';

const Error = () => {
    return (
        <Box sx={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant='h5'> Page Not Found </Typography>
        </Box>
    );
};

export default Error;