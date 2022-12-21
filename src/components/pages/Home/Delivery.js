import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CurrencyExchangeRounded, HeadsetMic, LocalShippingOutlined } from '@mui/icons-material';


const Delivery = () => {
    return (
        <Box px={16} py={16} bgcolor='whitesmoke'>
            <Grid container >
                <Grid item md={4} borderRight={1} borderColor='#00000052' lineHeight='20' >
                    <Box p={3} sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', gap: '10px' }}>
                        <LocalShippingOutlined  sx={{ fontSize: '50px', color: '#FF8E78' }} />
                        <Typography variant='h6'> FREE SHIPPING, RETURN </Typography>
                        <Typography color='#00000082'>Free Shipping On All US Orders</Typography>
                    </Box>
                </Grid>
                <Grid item md={4} borderRight={1} borderColor='#00000052'>
                    <Box p={3} sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', gap: '10px' }}>
                        <CurrencyExchangeRounded  sx={{ fontSize: '50px', color: '#FF8E78' }} />
                        <Typography variant='h6'> MONEY BACK GUARANTEE </Typography>
                        <Typography color='#00000082'>30 Days Money Back Guarantee</Typography>
                    </Box>
                </Grid>
                <Grid item md={4}>
                    <Box p={3} sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', gap: '10px' }}>
                        <HeadsetMic  sx={{ fontSize: '50px', color: '#FF8E78' }} />
                        <Typography variant='h6'> 1-800-333-44-55 </Typography>
                        <Typography color='#00000082'>24/7 Days Support</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Delivery;