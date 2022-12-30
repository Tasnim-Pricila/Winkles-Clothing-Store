import { AppBar, Avatar, Backdrop, Button, Fade, IconButton, InputAdornment, Menu, MenuItem, Modal, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logout from '../pages/Auth/logout';

const Header = ({ setSearchText, searchText }) => {
    const pages = ['home', 'shop', 'blog', 'about', 'contact'];
    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const cart = useSelector(state => state.allProducts.cart);
    const [countCart, setCountCart] = useState(0);
    const navigate = useNavigate();
    // console.log(cart)

    useEffect(() => {
        let count = 0;
        cart?.length > 0 && cart.forEach(item => {
            count = count + item.qty;
        })
        setCountCart(count);
    }, [cart, countCart])


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
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
    };
    const handleSearch = (e) => {
        setSearchText(e.target.value);
        if (e.key === 'Enter') {
            setOpen(!open)
            navigate('/shop')
        }
    }
    const handleLogout = () => {
        handleCloseUserMenu();
        logout();
    }

    const token = localStorage.getItem('accessToken')

    return (
        <div>
            <div>
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
                                sx={{ width: '100%' }}
                                name='search'
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
            </div>
            <AppBar position="static" sx={{ px: 10 }}>
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
                                fontFamily: 'monospace',
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
                                        className={({ isActive }) => (isActive ? "" : "")}
                                        sx={{
                                            textDecoration: 'none',
                                            fontWeight: 'bold',
                                            color: 'black',
                                            textTransform: 'capitalize',
                                            display: 'block',
                                            py: 1,
                                            px: 6,
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

                            { pages.map((page) => (
                                <Typography component={NavLink}
                                to={`/${page}`}
                                    className={({ isActive }) => (isActive ? "" : "")}
                                    sx={{
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
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
                                            <>
                                                <NavLink to='/login'
                                                    onClick={handleCloseUserMenu}>Login</NavLink>
                                                <NavLink to='/register'
                                                    onClick={handleCloseUserMenu}>Register</NavLink>
                                            </>
                                            :
                                            <>
                                                <NavLink to='/login'><Button onClick={handleLogout}> Logout </Button></NavLink>
                                                <NavLink to='/dashboard'
                                                    onClick={handleCloseUserMenu}>My Dashboard</NavLink>
                                            </>

                                    }


                                </MenuItem>

                            </Menu>
                            <IconButton sx={{ p: 0 }}>
                                <SearchIcon onClick={handleOpen} />
                            </IconButton>
                            <IconButton sx={{ p: 0 }}>
                                <FavoriteBorderIcon />
                            </IconButton>
                            <IconButton sx={{ p: 0 }} onClick={handleCart}>
                                <Badge badgeContent={countCart} color="secondary">
                                    <ShoppingCartIcon color="action">
                                    </ShoppingCartIcon>
                                </Badge>
                            </IconButton>

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar src="/broken-image.jpg" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;