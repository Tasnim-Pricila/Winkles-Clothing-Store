import { Button, Card, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import Footer from '../../shared/Footer';
import login from '../../../images/login.jpg'
import { ArrowDownward, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

const Register = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };
    const [loading, setLoading] = useState(false)

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        others: ''
    })

    if (loading) {
        return <Loading></Loading>
    }

    const handleClick = async (e) => {
        e.preventDefault();
        // console.log(userInfo);

        if (userInfo.firstName === '') {
            setError({ firstName: 'This field is required' })
        }
        else if (userInfo.lastName === '') {
            setError({ lastName: 'This field is required' })
        }
        else if (userInfo.email === '') {
            setError({ email: 'This field is required' })
        }
        else if (userInfo.password === '') {
            setError({ password: 'This field is required' })
        }
        else if (userInfo.confirmPassword === '') {
            setError({ confirmPassword: 'This field is required' })
        }
        else if (userInfo.firstName.length < 3) {
            setError({ firstName: 'Name must be at least 3 characters' })
        }
        else if (userInfo.lastName.length < 3) {
            setError({ lastName: 'Name must be at least 3 characters' })
        }
        else {
            setLoading(true)
            await Api.post(`/users/signup`, userInfo)
                .then(res => {
                    // console.log(res);
                    if (res.data.status === 'success') {
                        navigate('/login')
                        setLoading(false)
                        toast.success('Registration Successful ', {
                            theme: 'colored',
                        });
                    }
                })
                .catch(err => {
                    // console.log(err.response.data.error)
                    if (err.response.data.error.toLowerCase().includes('email')) {
                        setError({ email: err.response.data.error })
                    }
                    else if (err.response.data.error.toLowerCase().includes('firstname')) {
                        setError({ firstName: err.response.data.error })
                    }
                    else if (err.response.data.error.toLowerCase().includes('lastname')) {
                        setError({ lastName: err.response.data.error })
                    }
                    else if (err.response.data.error.toLowerCase().includes('confirmpassword')) {
                        setError({ confirmPassword: err.response.data.error })
                    }
                    else if (err.response.data.error.toLowerCase().includes('password')) {
                        setError({ password: err.response.data.error })
                    }
                    else {
                        setError({ others: err.response.data.error })
                    }
                })
        }
    }
    return (
        <>
            <Box sx={{ px: { md: 16, xs: 4 } }} my={5}>
                <Card variant="outlined" sx={{ boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                    <Grid container>
                        <Grid item xs={12} md={6}  >
                            <Box sx={{
                                backgroundImage: `url(${login})`,
                                backgroundSize: 'cover',
                                minHeight: '80vh',
                                height: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                <Box sx={{ position: 'absolute', height: '100%', width: '100%', background: '#41319ce3' }}>
                                    <Box sx={{ p: 4, color: 'white' }}>
                                        <Typography sx={{ textTransform: 'uppercase', fontSize: '20px', letterSpacing: '2px', fontWeight: 'bold' }}> Winkles </Typography>
                                        <Typography variant='h4' mt={20} sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                                            Welcome to our <br />
                                            Community
                                        </Typography>
                                        <Typography sx={{ textAlign: 'center', mt: 2 }}>
                                            Sign up to use all features of this website and discover a great amount of new opportunities...
                                        </Typography>
                                        <Box sx={{ display: { xs: 'initial', md: 'none' }  }}>
                                            <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}> Sign Up</Typography>
                                            <ArrowDownward sx={{ width: '100%', mt: 2, }} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ p: { xs: 4, lg: 6 } }}>
                            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }} >
                                Sign Up to Winkles
                            </Typography>
                            <Typography sx={{ fontSize: '14px', textAlign: 'center', pt: 1 }}>
                                Get your Free Winkles account now....
                            </Typography>
                            <form onSubmit={handleClick}>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            variant="outlined"
                                            fullWidth
                                            id="firstName"
                                            label="First Name*"
                                            autoFocus
                                            onKeyUp=
                                            {(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                        />
                                        <Typography sx={{ color: '#d32f2f', fontSize: '13px' }}> {error.firstName} </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="lastName"
                                            label="Last Name*"
                                            name="lastName"
                                            onKeyUp=
                                            {(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                        />
                                        <Typography sx={{ color: '#d32f2f', fontSize: '13px' }}> {error.lastName} </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            type='email'
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            onKeyUp=
                                            {(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                        />
                                        <Typography sx={{ color: '#d32f2f', fontSize: '13px' }}> {error.email} </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                variant="outlined"
                                                id="outlined-adornment-password"
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                onKeyUp={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <Typography sx={{ color: '#d32f2f', fontSize: '13px' }}> {error.password} </Typography>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-confirm-password">
                                                Confirm Password</InputLabel>
                                            <OutlinedInput
                                                variant="outlined"
                                                id="outlined-adornment-confirm-password"
                                                label="Confirm Password"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                onKeyUp={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownConfirmPassword}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <Typography sx={{ color: '#d32f2f', fontSize: '13px' }}> {error.confirmPassword} </Typography>
                                            <Typography sx={{ color: '#d32f2f', fontSize: '14px', textAlign: 'center', mt: 1 }}> {error.others} </Typography>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Typography sx={{ display: 'block', padding: '20px 0', fontSize: '14px' }}>By registering you agree to the Velzon
                                    <Link conponent={ReactLink} to="#" underline='none' pl={1}>
                                        Terms of Use
                                    </Link>
                                </Typography>

                                <Button type="submit" fullWidth variant="contained">
                                    Sign Up
                                </Button>
                            </form>
                            <Typography sx={{ textAlign: 'center', mt: 2 }}>Already have an account?
                                <Link component={ReactLink} to="/login" underline='none' pl={1} fontWeight='bold' >
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