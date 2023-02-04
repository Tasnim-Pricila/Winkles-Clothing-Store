import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import about from '../../../images/about.png'
import one from '../../../images/About/1.png'
import two from '../../../images/About/2.png'
import three from '../../../images/About/3.png'
import four from '../../../images/About/4.png'
import Footer from '../../shared/Footer';
import { Link as Routerlink } from 'react-router-dom';


const About = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px:{ md: 16 , xs: 4 }, py: 5, bgcolor: '#FF8E78' }}>
                <Typography variant='h5' sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                    About
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/" underline="hover" color="inherit" component={Routerlink}>
                        Home
                    </Link>
                    <Typography color="text.primary">About</Typography>
                </Breadcrumbs>
            </Box>
            <Box sx={{ px:{ md: 16 , xs: 4 }, mb: 16 , mt: 4}}>
                <Grid container spacing={{md: 4}} justifyContent='center' alignItems='center'>
                    <Grid item xs={12} md={6} justifyContent='center' alignItems='center' 
                    sx={{ pr: { lg: 20 }}}>
                        <Typography variant='h4' mb={6} sx={{ lineHeight: '50px' }}>
                            We take fashion <br /> personally & we bring you <br /> happiness
                        </Typography>
                        <Typography sx={{ textAlign: 'justify' }}>
                            Why not return to our amazing shop and start filling it with products. Just click on the button below to instantly get back to the shop page.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                        </Typography>
                        <Typography sx={{ mt: 6, fontFamily: 'Ruthie', color: '#FF8E78', fontSize: 36, fontWeight: 'bold', letterSpacing: '1px' }}>
                            Tasnim Pricila
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ position: 'relative'}}>
                            <img src={about} alt="about_image" style={{ width: '100%', 
                            overflow: 'hidden' }} />
                    </Grid>
                </Grid>
            </Box>
            <Box bgcolor='#F5F5F5' textAlign='center'>
                <Typography variant='h4' pt={10} pb={10}> Prefessional Experts </Typography>
                <Grid container columnSpacing={4} pb={10} sx={{ px:{ md: 16 , xs: 4 } }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box>
                            <img src={one} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Twitter>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box>
                            <img src={two} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Twitter>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box>
                            <img src={three} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Twitter>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box>
                            <img src={four} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor: 'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' } }}></Twitter>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Footer></Footer>
        </>

    );
};

export default About;