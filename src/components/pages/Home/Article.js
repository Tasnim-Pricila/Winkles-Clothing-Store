import { Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import one from '../../../images/Article/1.png';


const Article = () => {
    return (
        <div>
            <Typography variant='h4' sx={{ textAlign: 'center', pt: 10, textTransform: 'uppercase' }}>
                Latest Articles
            </Typography>

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                mt: 4,
                px: 16,
                mb: 10
            }}>
                <Grid item md={4}
                    sx={{
                        '&:hover img': {
                            transform: 'scale(1.2)'
                        }
                    }}>
                    <Box sx={{ overflow: 'hidden' }} >
                        <img src={one} alt="" width='100%' 
                        style={{ 
                            transition: '3s ease-in-out',
                            cursor: 'pointer' 
                        }}  />
                    </Box>
                    <Typography color='#A4A4A4' pt={1} pb={2}> June 24, 2020 </Typography>
                    <Typography variant='h5' sx={{ '&:hover': { color: '#FF8E78', transitionDuration: '.5s' }, cursor: 'pointer' }}> Never putting your <br /> Cocktail down to leave </Typography>
                    <Typography py={2}> It reopened this year following a refurb which aims to cement its place a surfer's paradise. It now boasts two. </Typography>
                    <Link href="#" sx={{
                        color: '#A4A4A4', textDecorationColor: '#A4A4A4',
                        '&:hover': { color: '#FF8E78', transitionDuration: '.5s' }
                    }}>
                        Read More
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default Article;