import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import useUsers from '../../../Custom Hook/useUsers';

const Register = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [email, setEmail] = useState([])
    const [users, setUsers] = useUsers([])
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        const findEmail = users.find(user => user.email === userInfo.email)
        setEmail(findEmail);
    }, [users, userInfo.email])

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(userInfo);

        if (email) {
            console.log('Email Exists')
            console.log(email);
        }
        if (!email) {
            await Api.put(`/user/${userInfo.email}`, userInfo)

                .then(res => {
                    console.log('Inserted')
                    const accessToken = res.data.accessToken;
                    console.log(accessToken)
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
                .catch(err => console.log(err.message))
            console.log(email);
            navigate('/')
        }
        e.target.reset();
    }
    return (
        <div>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
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
        </div>
    );
};

export default Register;