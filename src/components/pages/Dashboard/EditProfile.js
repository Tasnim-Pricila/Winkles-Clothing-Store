import { Box, Button, Card, Grid, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, updateUserAction } from '../../../Redux/actions';
import avatar from '../../../images/avatar.png'
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
    const user = useSelector(state => state.allUsers.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { firstName, lastName, email, status, createdAt } = user;

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUserAction({
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            country: e.target.country.value,
        }))
        navigate('/dashboard/profile')
    }
    const handleCancel = () => {
        navigate('/dashboard/profile')
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
            <Box p={3}>
                <Grid container spacing={2} >
                    <Grid item md={12}>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', padding: '20px 40px' }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src={avatar} alt="" style={{ border: '5px solid #eee8e8', borderRadius: '50%', width: '100px' }} />
                                <Typography width='100%' textTransform='uppercase' fontWeight='bold'> {firstName} {lastName} </Typography>
                            </Box>
                            {
                                user?.length !== 0 &&
                                <>
                                    <form onSubmit={handleUpdate}>
                                        <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Grid item md={4}>
                                                <Typography textAlign='right' pr={20}> First Name </Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField sx={{
                                                    width: '100%',
                                                    '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                                        fontSize: '13px', color: '#212529'
                                                    }
                                                }}
                                                    defaultValue={user?.firstName && user?.firstName}
                                                    autoComplete='off'
                                                    id="filled-hidden-label-small"
                                                    size="small"
                                                    name='firstName'
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Grid item md={4}>
                                                <Typography textAlign='right' pr={20}>Last Name </Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField sx={{
                                                    width: '100%',
                                                    '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                                        fontSize: '13px', color: '#212529'
                                                    }
                                                }}
                                                    defaultValue={user?.lastName && user?.lastName}
                                                    id="filled-hidden-label-small"
                                                    name='lastName'
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
                                                    value={email}
                                                    id="filled-hidden-label-small"
                                                    size="small"
                                                    disabled

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
                                                    defaultValue={user?.phone && user?.phone}
                                                    id="filled-hidden-label-small"
                                                    size="small"
                                                    name='phone'
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
                                                    defaultValue={user?.address && user?.address }
                                                    id="filled-hidden-label-small"
                                                    size="small"
                                                    name='address'
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
                                                    defaultValue={user?.country && user.country }
                                                    id="filled-hidden-label-small"
                                                    size="small"
                                                    name='country'
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
                                                    value={createdAt}
                                                    id="filled-hidden-label-small"
                                                    size="small"
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>

                                        <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                            <Button variant='contained' type='submit '> Save </Button>
                                            <Button variant='contained' onClick={handleCancel}> Cancel </Button>
                                        </Box>
                                    </form>

                                </>
                            }




                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EditProfile;