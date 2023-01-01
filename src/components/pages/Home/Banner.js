import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import banner from '../../../images/seven.jpg'
import { LocalGroceryStore } from '@mui/icons-material';

const Banner = () => {
    const buttonStyle = {
        color: 'black',
        marginTop: 3,
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: 5,
        paddingRight: 5,
        '&:hover': {
            color: 'white',
            backgroundColor: 'black',
            transitionDuration: '.5s',
        },
        transitionDuration: '.5s',
        boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;'

    }
    return (

        <Box sx={{
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            height: '90vh',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top',
        }}>
            <Grid container sx={{ height: '100%', display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                <Grid md={6} sx={{ px: 16 }}>
                    <Typography variant="overline" sx={{ fontSize: 20, textTransform: 'uppercase' }}> Fashion 2022  </Typography>
                    <Typography variant="h3" gutterBottom> New Season </Typography>
                    <Typography variant="body1" gutterBottom> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, labore quo repellat sed asperiores architecto laudantium unde, amet ratione rerum, cum culpa. Sint aperiam asperiores quibusdam necessitatibus, obcaecati autem explicabo!  </Typography>
                    <Button variant="outlined" endIcon={<LocalGroceryStore />}
                        sx={buttonStyle}>
                        Shop
                    </Button>
                </Grid>
            </Grid>
        </Box>

    );
};

export default Banner;