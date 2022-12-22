import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 240;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    const drawer = (
        <div>
            <Toolbar>
                <Typography component={NavLink}
                    to='/'
                    className={({ isActive }) => (isActive ? "" : "")}
                    sx={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        width: '100%'
                    }}> Winkles
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {/* User  */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        <ListItemText >
                            <NavLink to='/dashboard'>My Orders</NavLink>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>

                {/* Admin  */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        <ListItemText >
                            <NavLink to='/dashboard/addProduct'>Add Product</NavLink>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        <ListItemText >
                            <NavLink to='/dashboard/manageProducts'>Manage Products</NavLink>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        <ListItemText >
                            <NavLink to='/dashboard/orderDetails'>Order Details</NavLink>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        <ListItemText >
                            <NavLink to='/dashboard/allUsers'>All Users</NavLink>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>

                {/* All  */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText >
                            <NavLink to='/dashboard/profile'>My Profile</NavLink>
                        </ListItemText>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
            </List>

        </div>
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
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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