import { Box, Button, Card, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import Footer from '../../shared/Footer';
import login from '../../../images/login.jpg'
import { AlternateEmail, ArrowDownward, Visibility, VisibilityOff } from '@mui/icons-material';
import { getMe } from '../../../Redux/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        email: '',
        password: '',
        others: ''
    })

    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (userInfo.email === '') {
            setError({ email: 'This field is required' })
        }
        else if (userInfo.password === '') {
            setError({ password: 'This field is required' })
        }
        else {
            await Api.post(`/users/login`, userInfo)
                .then(res => {
                    if (res.data.status === 'success') {
                        setLoading(true)
                        const accessToken = res.data?.data?.token;
                        localStorage.setItem('accessToken', accessToken);
                        setToken(accessToken);
                    }
                })
                .catch(err => {
                    if (err.response.data.error.toLowerCase().includes('email')) {
                        setError({ email: err.response.data.error })
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

    const from = location.state?.from?.pathname || '/';
    useEffect(() => {
        if (token) {
            setLoading(false)
            toast.success('Login Successful ', {
                theme: 'colored',
            });
            navigate(from, { replace: true })
            dispatch(getMe())
        }
    }, [token, navigate, from, dispatch])

    if (loading) {
        return <Loading></Loading>
    }


    return (
        <>
            <Box my={5} sx={{ px:{ md: 16 , xs: 4 } }}>
                <Card variant="outlined" sx={{ boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                    <Grid container>
                        <Grid item xs={12} md={6} >
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
                                            Sign in to use all features of this website and discover a great amount of new opportunities...
                                        </Typography>
                                        <Box sx={{ display: { xs: 'initial', md: 'none' }  }}>
                                            <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}> Sign In </Typography>
                                            <ArrowDownward sx={{ width: '100%', mt: 2, }} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ p:{ xs: 4, lg: 12 } }}>
                            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                Welcome Back !
                            </Typography>
                            <Typography sx={{ fontSize: '14px', textAlign: 'center', pt: 1 }}>
                                Sign in to continue to Winkles...
                            </Typography>
                            <form onSubmit={handleClick}>
                                <Grid container spacing={3} mt={3}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                                            <OutlinedInput
                                                variant="outlined"
                                                id="outlined-adornment-email"
                                                type='email'
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                error={error.email}
                                                onChange=
                                                {(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton sx={{ cursor: 'text' }}>
                                                            <AlternateEmail />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText sx={{ color: '#d32f2f' }}> {error.email} </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                variant="outlined"
                                                id="outlined-adornment-password"
                                                label="Password"
                                                error={error.password}
                                                type={showPassword ? 'text' : 'password'}
                                                onKeyUp={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText sx={{ color: '#d32f2f' }}> {error.password} </FormHelperText>
                                        </FormControl>

                                    </Grid>
                                </Grid>
                                <Typography sx={{ color: '#d32f2f', fontSize: '14px', textAlign: 'center' }}> {error?.others} </Typography>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }} >
                                    Sign In
                                </Button>
                            </form>
                            <Typography sx={{ textAlign: 'center', mt: 2 }}> Don't have an account?
                                <Link component={ReactLink} to="/register" underline='none' pl={1} fontWeight='bold' >
                                    Signup
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

export default Login;