import { Button, Card, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import Footer from '../../shared/Footer';
import login from '../../../images/login.jpg'

const Register = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(userInfo);
        await Api.post(`/users/signup`, userInfo)
            .then(res => {
                console.log(res);
                if (res.data.status === 'success') {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err.response.data.error))
    }
    return (
        <>
            <Box px={16} my={5}>
                <Card variant="outlined" sx={{ boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                    <Grid container>
                        <Grid item md={6}>
                            <Box sx={{
                                backgroundImage: `url(${login})`,
                                backgroundSize: 'cover',
                                height: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                <Box sx={{ position: 'absolute', height: '100%', width: '100%', background: '#41319ce3' }}>

                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6} p={6}>
                            <Typography variant="h5" sx={{}}>
                                Register Account
                            </Typography>
                            <Typography variant="caption" sx={{}}>
                                Get your Free Winkles account now.
                            </Typography>
                            <form onSubmit={handleClick}>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            onKeyUp=
                                            {(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lname"
                                            onBlur=
                                            {(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            type='email'
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            onKeyUp=
                                            {(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onBlur=
                                            {(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="cpassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onBlur=
                                            {(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Typography variant='caption' sx={{ display: 'block', padding: '20px 0' }}>By registering you agree to the Velzon
                                    <Link href="#" underline='none' pl={1}>
                                        Terms of Use
                                    </Link>
                                </Typography>
                                <Button type="submit" fullWidth variant="contained">
                                    Sign Up
                                </Button>
                            </form>
                            <Typography sx={{ textAlign: 'center', mt: 2 }}>Already have an account?
                                <Link href="/login" underline='none' pl={1}>
                                    Login
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
            <Footer></Footer>
        </>
    );
};

export default Register;