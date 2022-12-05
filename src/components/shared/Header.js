import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled';

const Header = () => {
    const pages = ['Home', 'Shop', 'Blog', 'About', 'Contact'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const cart = useSelector(state => state.allProducts.cart);
    const [countCart, setCountCart] = useState(0);
    // const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let count = 0;
        let total = 0;
        cart.forEach(item => {
            count = count + item.qty;
            total = parseFloat(total) + parseFloat(item.price) * parseFloat(item.qty);
            total = total.toFixed(2);
        })
        setCountCart(count);
        // setTotal(total);
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

    return (
        <div>
            <AppBar position="static">
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
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
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
                            {/* {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))} */}

                            <Typography component={NavLink}
                                to='/shop'
                                className={({ isActive }) => (isActive ? "" : "")}
                                sx={{
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textTransform: 'uppercase',
                                }}>Shop</Typography>

                            <Typography component={NavLink} to='/blog'
                                sx={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                }}>Blog</Typography>
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
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                                <MenuItem sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <NavLink to='/login'>Login</NavLink>
                                    <NavLink to='/register'>Register</NavLink>
                                </MenuItem>

                            </Menu>
                            <IconButton sx={{ p: 0 }}>
                                <SearchIcon />
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