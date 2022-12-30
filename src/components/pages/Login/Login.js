import { Box, Button, Card, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import Footer from '../../shared/Footer';
import login from '../../../images/login.jpg'


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const handleClick = async (e) => {
        e.preventDefault();
        await Api.post(`/users/login`, userInfo)
            .then(res => {
                // console.log(res)
                const accessToken = res.data?.data?.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);

            })
            .catch(err => console.log(err.response.data.error))
    }
    const from = location.state?.from?.pathname || '/shop';
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token])

    return (
        <>

            <Box px={16} my={5}>
                <Card variant="outlined" sx={{ boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                    <Grid container>
                        <Grid item md={6}>
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

                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6} p={6}>
                            <Typography variant="h5" sx={{}}>
                                Welcome Back !
                            </Typography>
                            <Typography variant="caption" sx={{}}>
                                Sign in to continue to Winkles.
                            </Typography>
                            <form onSubmit={handleClick}>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item xs={12}>
                                        <TextField required
                                            variant="outlined"
                                            fullWidth
                                            id="emaill"
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
                                            // name="password"
                                            label="Password"
                                            type="password"
                                            id="passwordd"
                                            autoComplete="current-password"
                                            onBlur=
                                            {(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>

                                <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px' }} >
                                    Sign In
                                </Button>
                            </form>
                            <Typography sx={{ textAlign: 'center', mt: 2 }}> Don't have an account?
                                <Link href="/login" underline='none' pl={1}>
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