import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../../Redux/actions';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState([])
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const userss = useSelector(state => state.allUsers.users);

    useEffect(() => {
        dispatch(getUsers());
        const findEmail = userss.find(user => user.email === userInfo.email)
        setEmail(findEmail);
    }, [userInfo.email, setEmail])

    const handleClick = async (e) => {
        e.preventDefault();
        if (email) {
            // console.log("exists", email);
            if (email.password === userInfo.password) {
                navigate('/cart')
            }
            else {
                console.log("pass not match", userInfo.password, email.password);
            }
        }
        else {
            console.log("Not exists")
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
                    <form noValidate onSubmit={handleClick}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
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
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;