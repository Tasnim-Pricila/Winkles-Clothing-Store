import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink, Outlet } from 'react-router-dom';
import { Add, ManageHistory, PeopleAlt, Person, ShoppingBasket, ShoppingCart } from '@mui/icons-material';

const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 240;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    const drawer = (
        <Box
            sx={{ bgcolor: '#212529', minHeight: '100vh' }}
        >
            <Toolbar>
                <Typography component={NavLink}
                    to='/'
                    sx={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        width: '100%',
                        color: '#980aeb',
                        letterSpacing: '2px',
                        fontSize: '20px'
                    }}>
                    Winkles
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {/* User  */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}> <ShoppingBasket /> </ListItemIcon>
                        <ListItemText>
                            <Typography component={NavLink} to='/dashboard'
                                sx={{
                                    textDecoration: 'none',
                                    // fontWeight: 'bold',
                                    color: 'white',
                                    // textTransform: 'uppercase',
                                }}>
                                My Orders
                            </Typography>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>

                {/* Admin  */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}> <Add /> </ListItemIcon>
                        <ListItemText>
                            <Typography component={NavLink} to='/dashboard/addProduct'
                                sx={{
                                    textDecoration: 'none',
                                    // fontWeight: 'bold',
                                    color: 'white',
                                    // textTransform: 'uppercase',
                                }}>
                                Add Product
                            </Typography>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}> <ManageHistory /> </ListItemIcon>
                        <ListItemText >
                            <Typography component={NavLink} to='/dashboard/manageProducts'
                                sx={{
                                    textDecoration: 'none',
                                    // fontWeight: 'bold',
                                    color: 'white',
                                    // textTransform: 'uppercase',
                                }}>Manage Products</Typography>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}> <ShoppingCart /> </ListItemIcon>
                        <ListItemText >
                            <Typography component={NavLink} to='/dashboard/orderDetails'
                                sx={{
                                    textDecoration: 'none',
                                    // fontWeight: 'bold',
                                    color: 'white',
                                    // textTransform: 'uppercase',
                                }}>Order Details</Typography>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}> <PeopleAlt /> </ListItemIcon>
                        <ListItemText >
                            <Typography component={NavLink} to='/dashboard/allUsers'
                                sx={{
                                    textDecoration: 'none',
                                    // fontWeight: 'bold',
                                    color: 'white',
                                    // textTransform: 'uppercase',
                                }}>All Users</Typography>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>

                {/* All  */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}><Person /></ListItemIcon>
                        <ListItemText>
                            <Typography component={NavLink} to='/dashboard/profile'
                                sx={{
                                    textDecoration: 'none',
                                    // fontWeight: 'bold',
                                    color: 'white',
                                    // textTransform: 'uppercase',
                                }}>My Profile</Typography>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    );
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{
                        width: { sm: drawerWidth },
                        flexShrink: { sm: 0 },
                    }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

                        }}
                    >
                        {drawer}

                    </Drawer>

                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Outlet></Outlet>
                </Box>
            </Box>
        </div>
    );
};

export default Dashboard;