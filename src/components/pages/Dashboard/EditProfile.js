import { Box, Button, Card, Grid, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../../Redux/actions';
import avatar from '../../../images/avatar.png'
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    return (
        <Box mb={4}>
            <Toolbar sx={{
                boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#495057',
                letterSpacing: '-0.5px'
            }}>
                My Profile
            </Toolbar>
            <Box p={3}>
                <Grid container spacing={2} >
                    <Grid item md={12}>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', padding: '20px 40px' }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src={avatar} alt="" style={{ border: '5px solid #eee8e8', borderRadius: '50%', width: '100px' }} />
                                <Typography width='100%' textTransform='uppercase' fontWeight='bold'> Tasnim Pricila </Typography>

                               

                            </Box>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Name </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}



                                        defaultValue='Tasnim'
                                        id="filled-hidden-label-small"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Email </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}



                                        defaultValue='fff'
                                        id="filled-hidden-label-small"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Phone </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}



                                        defaultValue='fff'
                                        id="filled-hidden-label-small"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Address </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}



                                        defaultValue='fff'
                                        id="filled-hidden-label-small"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Country </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}



                                        defaultValue='fff'
                                        id="filled-hidden-label-small"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Joined on </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}



                                        defaultValue='fff'
                                        id="filled-hidden-label-small"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
                                <Button variant='contained'> Save </Button>
                                <Button variant='contained'> Cancel </Button>
                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EditProfile;