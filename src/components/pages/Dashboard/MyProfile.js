import { Avatar, Box, Button, Card, Grid, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../../Redux/actions';
import avatar from '../../../images/avatar.png'
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    const user = useSelector(state => state.allUsers.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { firstName, lastName, email, status, imageUrl, createdAt } = user;


    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const handleEdit = () => {
        navigate('/dashboard/profile/edit')
    }
    const addBtn = {
        color: 'white',
        backgroundColor: '#45CB85',
        padding: '5px 10px',
        textTransform: 'capitalize',
        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
        '&:hover': {
            backgroundColor: '#3bad71',
        }
    }
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
            <Box m={4}>
                <Grid container>
                    <Grid item md={12}>
                        <Card variant="outlined" sx={{ boxShadow: '0 3px 3px rgba(56,65,74,0.1)', p: 5 }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <Avatar src={imageUrl ? imageUrl : avatar} alt=""
                                    sx={{ border: '5px solid #eee8e8', width: 100, height: 100 }}
                                />
                                <Typography width='100%' textTransform='uppercase' fontWeight='bold'> {firstName} {lastName} </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                                    <Button variant='contained' size='small' sx={addBtn} startIcon={<Edit fontSize='small' />}
                                        onClick={handleEdit}>
                                        Edit Profile
                                    </Button>
                                </Box>

                            </Box>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Name </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography> {firstName} {lastName} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Email </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography> {email} </Typography>
                                </Grid>
                            </Grid>
                            {
                                user?.phone &&
                                <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item md={4}>
                                        <Typography textAlign='right' pr={20}> Phone </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Typography>
                                            {user?.phone}

                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                            {
                                user?.address &&
                                <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item md={4}>
                                        <Typography textAlign='right' pr={20}> Address </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Typography>
                                            {user?.address}

                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                            {
                                user?.country &&
                                <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item md={4}>
                                        <Typography textAlign='right' pr={20}> Country </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Typography>
                                            {user?.country}

                                        </Typography>
                                    </Grid>
                                </Grid>
                            }

                            <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item md={4}>
                                    <Typography textAlign='right' pr={20}> Joined on </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography>
                                        {createdAt}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default MyProfile;