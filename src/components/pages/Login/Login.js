import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../../Axios/Api';
import useUsers from '../../../Custom Hook/useUsers';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState([]);
    const [token, setToken] = useState('');
    const [users] = useUsers([]);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        const findEmail = users.find(user => user.email === userInfo.email)
        setEmail(findEmail);
    }, [users, userInfo.email])

    const handleClick = async (e) => {
        e.preventDefault();
        if (email) {
            // console.log(email)
            if (email.password === userInfo.password) {
                navigate('/cart')
            }
            else {
                await Api.put(`/user/${userInfo.email}`, userInfo)
                    .then(res => {
                        const accessToken = res.data.accessToken;
                        // console.log(accessToken)
                        localStorage.setItem('accessToken', accessToken);
                        setToken(accessToken);
                    })
                    .catch(err => console.log(err.message))
                console.log("pass not match", userInfo.password, email.password);
            }
        }
        else {
            console.log("Not exists", email)
        }
    }

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