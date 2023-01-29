import { Box, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import women from '../../../images/women.png'
import men from '../../../images/men.png'
import kids from '../../../images/kids.png'

const Categories = () => {
    const navigate = useNavigate();

    const handleCollections = (value) => {
        navigate('/shop', { state: { value } })
    }

    const categories = [
        {
            title: 'Women',
            image: women,
            link: 'women'
        },
        {
            title: 'Men',
            image: men,
            link: 'men'
        },
        {
            title: 'Kids',
            image: kids,
            link: 'kids'
        },
    ]

    return (
        <Box px={16} mt={4}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}>
                {
                    categories.map(category =>
                        <Box
                            sx={{
                                backgroundImage: `url(${category.image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                '&:hover > .MuiBox-root': {
                                    borderColor: 'black',
                                    transitionDuration: '1s',
                                },
                                '&:hover > .MuiBox-root > .MuiBox-root > .MuiTypography-root': {
                                    color: 'black',
                                    transitionDuration: '1s',
                                },
                                flexBasis: '100%'
                            }}>
                            <Box border={1} m={2} sx={{
                                borderColor: 'white',
                                transitionDuration: '1s'
                            }}>
                                <Box p={3}>
                                    <Typography variant='h4' sx={{ textTransform: 'uppercase', color: 'white', transitionDuration: '1s' }}> {category.title} </Typography>
                                    <Typography pt={1} variant='h6' color='white' sx={{ transitionDuration: '1s' }}> Collection </Typography>
                                    <Typography pt={2} sx={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleCollections(category.link)}> view collection </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    );
};

export default Categories;