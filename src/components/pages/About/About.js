import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import about from '../../../images/about.png'
import one from '../../../images/About/1.png'
import two from '../../../images/About/2.png'
import three from '../../../images/About/3.png'
import four from '../../../images/About/4.png'
import Footer from '../../shared/Footer';

const About = () => {
    return (
        <>
            <Box sx={{ px: 16, mb: 16 }}>
                <Typography variant='h4' sx={{ textAlign: 'center', py: 10, textTransform: 'uppercase' }}>
                    Who we are
                </Typography>
                <Grid container spacing={4} sx={{}} justifyContent='center' alignItems='center'>
                    <Grid item md={6} justifyContent='center' alignItems='center' pr={20}>
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
                    <Grid item md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={about} alt="about_image" />
                        </Box>

                    </Grid>
                </Grid>
            </Box>
            <Box bgcolor='#F5F5F5' textAlign='center'>
                <Typography variant='h4' pt={10} pb={10}> Prefessional Experts </Typography>
                <Grid container columnSpacing={4} pb={10} px={16}>
                    <Grid item md={3}>
                        <Box>
                            <img src={one} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4}}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black'} }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Twitter>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Box>
                            <img src={two} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4}}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black'} }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Twitter>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Box>
                            <img src={three} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4}}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black'} }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Twitter>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Box>
                            <img src={four} alt=""
                                style={{ maxWidth: '90%', borderRadius: '50%', border: '8px solid white' }} />
                        </Box>
                        <Typography variant='h6' fontWeight='bold' pt={2} pb={1}>My Name</Typography>
                        <Typography color='#9DA1A5' pt={1}>CEO & Founder</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4}}>
                            <Facebook sx={{ color: '#3B5998', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Facebook>
                            <Instagram sx={{ color: '#E4405F', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black'} }}></Instagram>
                            <Twitter sx={{ color: '#1DA1F2', cursor: 'pointer', bgcolor:'white', padding: '10px', borderRadius: '50%', '&:hover': { color: 'white', bgcolor: 'black' }}}></Twitter>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Footer></Footer>
        </>

    );
};

export default About;