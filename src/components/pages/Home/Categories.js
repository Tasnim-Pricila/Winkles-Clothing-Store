import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import women from '../../../images/women.png'
import men from '../../../images/men.png'
import kids from '../../../images/kids.png'

const Categories = () => {
    const navigate = useNavigate();

    const handleCollections = (value) => {
        navigate('/shop', { state: { value } })
    }

    return (
        <Box px={16} mt={4}>
            <Grid container >
                <Grid item md={4}
                    sx={{
                        backgroundImage: `url(${women})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        '&:hover > .MuiBox-root': {
                            borderColor: 'black',
                            transitionDuration: '1s',
                        },
                        '&:hover > .MuiBox-root > .MuiBox-root > .MuiTypography-root': {
                            color: 'black',
                            transitionDuration: '1s',
                        }
                    }}>
                    <Box border={1} m={2} sx={{
                        borderColor: 'white',
                        transitionDuration: '1s'
                    }}>
                        <Box p={3}>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase', color: 'white', transitionDuration: '1s' }}> Women </Typography>
                            <Typography pt={1} variant='h6' color='white' sx={{ transitionDuration: '1s' }}> Collection </Typography>
                            <Typography pt={2} sx={{ cursor: 'pointer' }} onClick={() => handleCollections('women')}> view collection </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={4}
                    sx={{
                        backgroundImage: `url(${men})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        '&:hover > .MuiBox-root': {
                            borderColor: 'black',
                            transitionDuration: '1s',
                        },
                        '&:hover > .MuiBox-root > .MuiBox-root > .MuiTypography-root': {
                            color: 'black',
                            transitionDuration: '1s',
                        }
                    }}>
                    <Box border={1} m={2} sx={{
                        borderColor: 'white',
                        transitionDuration: '1s'
                    }}>
                        <Box p={3}>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase', color: 'white', transitionDuration: '1s' }}> Men </Typography>
                            <Typography pt={1} variant='h6' color='white' sx={{ transitionDuration: '1s' }}> Collection </Typography>
                            <Typography pt={2} sx={{ cursor: 'pointer' }} onClick={() => handleCollections('men')} > view collection </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={4}
                    sx={{
                        backgroundImage: `url(${kids})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        '&:hover > .MuiBox-root': {
                            borderColor: 'black',
                            transitionDuration: '1s',
                        },
                        '&:hover > .MuiBox-root > .MuiBox-root > .MuiTypography-root': {
                            color: 'black',
                            transitionDuration: '1s',
                        }
                    }}>
                    <Box border={1} m={2} sx={{
                        borderColor: 'white',
                        transitionDuration: '1s'
                    }}>
                        <Box p={3}>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase', color: 'white', transitionDuration: '1s' }}> Kids </Typography>
                            <Typography pt={1} variant='h6' color='white' sx={{ transitionDuration: '1s' }}> Collection </Typography>
                            <Typography pt={2} sx={{ cursor: 'pointer' }} onClick={() => handleCollections('kids')}> view collection </Typography>
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default Categories;