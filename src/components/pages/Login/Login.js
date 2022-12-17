import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';

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
        if(token){
            navigate(from, { replace: true });
        }
    },[token])

    return (
        <div>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div >
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form onSubmit={handleClick}>
                        <Grid container spacing={2}>
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
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="passwordd"
                                    autoComplete="current-password"
                                    onBlur=
                                    {(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    New? Register
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;