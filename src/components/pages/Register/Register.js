import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import Footer from '../../shared/Footer';

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
                if(res.data.status === 'success'){
                    navigate('/login')
                }
            })
            .catch(err => console.log(err.response.data.error))
    }
    return (
        <div>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5" sx={{ py: 5, textAlign: 'center' }}>
                        Sign up
                    </Typography>
                    <form onSubmit={handleClick}>
                        <Grid container spacing={2}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 1 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Register;