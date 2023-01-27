import { AppBar, Avatar, Backdrop, Button, Fade, IconButton, InputAdornment, Menu, MenuItem, Modal, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logout from '../pages/Auth/logout';
import { HowToReg, Login, Logout } from '@mui/icons-material';
import { getCart, getMe } from '../../Redux/actions';

const Header = ({ setSearchText, searchText }) => {
    const pages = ['home', 'shop', 'blog', 'about', 'contact'];

    const user = useSelector(state => state.allUsers.user)
    let cart = user?.cart?.product
    const [countCart, setCountCart] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch])

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch])

    useEffect(() => {
        let count = 0;
        cart?.length > 0 && cart.forEach(item => {
            count = count + item.qty;
        })
        setCountCart(count);
    }, [dispatch, cart, countCart, user])

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCart = () => {
        navigate('/cart');
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#ffffff0f',
        boxShadow: 24,
        py: 30,
        px: 60
        // border: '5px solid red'
    };
    const handleSearch = (e) => {
        setSearchText(e.target.value);
        if (e.key === 'Enter') {
            setOpen(!open)
            navigate('/shop')
        }
    }
    const handleLogout = () => {
        dispatch(getMe());
        handleCloseUserMenu();
        logout();
        dispatch(getMe());
    }
    const location = useLocation();
    const token = localStorage.getItem('accessToken')

    return (
        <Box>
            <Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <TextField id="outlined-basic" variant="outlined"
                                sx={{ width: '100%', bgcolor: 'white', borderRadius: '0%' }}
                                name='search'
                                placeholder='Search.....'
                                onKeyUp={handleSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </Fade>
                </Modal>
            </Box>
            <AppBar position="static" sx={{
                px: 10,
                bgcolor: '#4b38b3'
            }}>
                <Container maxWidth="xl" >
                    <Toolbar>
                        {/* Large screen logo  */}
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                textTransform: 'uppercase'
                            }}
                        >
                            Winkles
                        </Typography>

                        {/* Small screen menu icon  */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <Typography component={NavLink} onClick={handleCloseNavMenu}
                                        to={`/${page}`}
                                        sx={{
                                            textDecoration: 'none',
                                            fontWeight: 'bold',
                                            color: 'black',
                                            textTransform: 'capitalize',
                                            display: 'block',
                                            py: 1,
                                            px: 6,
                                            ...(location.pathname === `/${page}`) && {
                                                color: '#FF8E78'
                                            }
                                        }}> {page}
                                    </Typography>
                                ))}
                            </Menu>
                        </Box>

                        {/* Small screen logo  */}
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Winkles
                        </Typography>

                        {/* Menu Item  */}
                        <Box sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            gap: 2,
                            justifyContent: 'center'
                        }}>

                            {pages.map((page) => (
                                <Typography component={NavLink}
                                    to={`/${page}`}
                                    sx={{
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        ...(location.pathname === `/${page}`) && {
                                            color: '#FF8E78'
                                        }
                                    }}> {page}
                                </Typography>
                            ))}
                        </Box>

                        {/* Settings  */}
                        <Box sx={{
                            flexGrow: 0,
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center'
                        }}>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {
                                        !token ?
                                            <Box sx={{ width: '100px' }}>
                                                <NavLink to='/login' style={{
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    color: 'black',
                                                    display: 'block',
                                                }}
                                                    onClick={handleCloseUserMenu}>
                                                    <Button sx={{
                                                        color: 'black'
                                                    }} startIcon={<Login sx={{ color: '#878a99' }} />}> Login </Button>

                                                </NavLink>
                                                <NavLink to='/register' style={{
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    color: 'black'
                                                }}
                                                    onClick={handleCloseUserMenu}>
                                                    <Button sx={{
                                                        color: 'black'
                                                    }} startIcon={<HowToReg sx={{ color: '#878a99' }} />}> Register </Button>
                                                </NavLink>
                                            </Box>
                                            :
                                            <>
                                                <NavLink to='/dashboard' style={{
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    color: 'black'
                                                }}>
                                                    <Typography onClick={handleCloseUserMenu}>
                                                        My Dashboard
                                                    </Typography>
                                                </NavLink>
                                                <NavLink to='/login' style={{
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    color: 'black'
                                                }}>
                                                    <Button onClick={handleLogout} sx={{
                                                        color: 'black'
                                                    }}
                                                        startIcon={<Logout sx={{ color: '#878a99' }} />} >
                                                        Logout
                                                    </Button>
                                                </NavLink>
                                            </>
                                    }
                                </MenuItem>
                            </Menu>

                            <IconButton sx={{ p: 0, color: 'white' }}>
                                <SearchIcon onClick={handleOpen} />
                            </IconButton>
                            <IconButton sx={{ p: 0, color: 'white' }}>
                                <FavoriteBorderIcon />
                            </IconButton>
                            {
                                user?.cart?.product?.length > 0 ?
                                    <IconButton sx={{ p: 0, color: 'white' }} onClick={handleCart}>
                                        <Badge badgeContent={countCart} color='warning'>
                                            <ShoppingCartIcon color="white">
                                            </ShoppingCartIcon>
                                        </Badge>
                                    </IconButton>
                                    :
                                    <IconButton sx={{ p: 0, color: 'white' }} onClick={handleCart}>
                                        <Badge badgeContent='0' color='warning'>
                                            <ShoppingCartIcon color="white">
                                            </ShoppingCartIcon>
                                        </Badge>
                                    </IconButton>
                            }

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar src="/broken-image.jpg" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Header;