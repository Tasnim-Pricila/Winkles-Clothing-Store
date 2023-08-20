import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Add,
  Help,
  Logout,
  ManageHistory,
  PeopleAlt,
  Person,
  Settings,
  ShoppingBasket,
  ShoppingCart,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import logout from "../Auth/logout";
import { getMe } from "../../../Redux/actions/userActions";

const Dashboard = (props) => {
  const user = useSelector((state) => state.allUsers.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 240;

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <Box sx={{ bgcolor: "#212529", minHeight: "100vh" }}>
      <Toolbar>
        <Typography
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            width: "100%",
            color: "#980aeb",
            letterSpacing: "2px",
            fontSize: "20px",
          }}
        >
          Winkles
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {/* Admin   */}
        {user.length !== 0 ? (
          user?.role === "admin" ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "#A3A6B7",
                      ...(location.pathname === "/dashboard" && {
                        color: "white",
                      }),
                    }}
                  >
                    {" "}
                    <Add />{" "}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      component={NavLink}
                      to="/dashboard"
                      sx={{
                        textDecoration: "none",
                        color: "#A3A6B7",
                        ...(location.pathname === "/dashboard" && {
                          color: "white",
                          fontWeight: "600",
                          letterSpacing: "1px",
                        }),
                      }}
                    >
                      Add Product
                    </Typography>
                  </ListItemText>
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "#A3A6B7",
                      ...(location.pathname === "/dashboard/manageProducts" && {
                        color: "white",
                      }),
                    }}
                  >
                    {" "}
                    <ManageHistory />{" "}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      component={NavLink}
                      to="/dashboard/manageProducts"
                      sx={{
                        textDecoration: "none",
                        color: "#A3A6B7",
                        ...(location.pathname ===
                          "/dashboard/manageProducts" && {
                          color: "white",
                          fontWeight: "600",
                          letterSpacing: "1px",
                        }),
                      }}
                    >
                      Manage Products
                    </Typography>
                  </ListItemText>
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "#A3A6B7",
                      ...(location.pathname === "/dashboard/orderDetails" && {
                        color: "white",
                      }),
                    }}
                  >
                    {" "}
                    <ShoppingCart />{" "}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      component={NavLink}
                      to="/dashboard/orderDetails"
                      sx={{
                        textDecoration: "none",
                        color: "#A3A6B7",
                        ...(location.pathname === "/dashboard/orderDetails" && {
                          color: "white",
                          fontWeight: "600",
                          letterSpacing: "1px",
                        }),
                      }}
                    >
                      Order Details
                    </Typography>
                  </ListItemText>
                  <ListItemText />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "#A3A6B7",
                      ...(location.pathname === "/dashboard/allUsers" && {
                        color: "white",
                      }),
                    }}
                  >
                    {" "}
                    <PeopleAlt />{" "}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      component={NavLink}
                      to="/dashboard/allUsers"
                      sx={{
                        textDecoration: "none",
                        color: "#A3A6B7",
                        ...(location.pathname === "/dashboard/allUsers" && {
                          color: "white",
                          fontWeight: "600",
                          letterSpacing: "1px",
                        }),
                      }}
                    >
                      All Users
                    </Typography>
                  </ListItemText>
                  <ListItemText />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              {/* User  */}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "#A3A6B7",
                      ...(location.pathname === "/dashboard" && {
                        color: "white",
                      }),
                    }}
                  >
                    {" "}
                    <ShoppingBasket />{" "}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      component={NavLink}
                      to="/dashboard"
                      sx={{
                        textDecoration: "none",
                        color: "#A3A6B7",
                        ...(location.pathname === "/dashboard" && {
                          color: "white",
                          fontWeight: "600",
                          letterSpacing: "1px",
                        }),
                      }}
                    >
                      My Orders
                    </Typography>
                  </ListItemText>
                  <ListItemText />
                </ListItemButton>
              </ListItem>
            </>
          )
        ) : (
          navigate("/login")
        )}

        {/* All  */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon
              sx={{
                color: "#A3A6B7",
                ...(location.pathname === "/dashboard/profile" && {
                  color: "white",
                }),
              }}
            >
              <Person />
            </ListItemIcon>
            <ListItemText>
              <Typography
                component={NavLink}
                to="/dashboard/profile"
                sx={{
                  textDecoration: "none",
                  color: "#A3A6B7",
                  ...(location.pathname === "/dashboard/profile" && {
                    color: "white",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }),
                }}
              >
                My Profile
              </Typography>
            </ListItemText>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    dispatch(getMe());
    handleClose();
    logout();
    dispatch(getMe());
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: "#4b38b3",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              noWrap
              component="div"
              sx={{
                display: "flex",
                visibility: { xs: "hidden", sm: "initial" },
                fontSize: { sm: "14px", md: "20px" },
              }}
            >
              Dashboard
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              aria-describedby={id}
              onClick={handleClick}
            >
              <Avatar src={user?.imageUrl ? user?.imageUrl : ""} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontSize: { sm: "14px", md: "16px" },
                  }}
                >
                  {" "}
                  {user?.firstName} {user?.lastName}{" "}
                </Typography>
                <Typography variant="caption"> Designation</Typography>
              </Box>
            </Box>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                ".MuiPopover-paper": {
                  boxShadow: "0 5px 10px rgb(30 32 37 / 12%)",
                  width: "200px",
                },
                mt: 1,
              }}
            >
              <Typography p={1}>
                <NavLink
                  to="/dashboard/profile"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Button
                    sx={{
                      color: "black",
                    }}
                    startIcon={<AccountCircle sx={{ color: "#878a99" }} />}
                  >
                    Profile
                  </Button>
                </NavLink>
                <br />
                <NavLink
                  to="/soon"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Button
                    sx={{
                      color: "black",
                    }}
                    startIcon={<Help sx={{ color: "#878a99" }} />}
                  >
                    Help
                  </Button>
                </NavLink>
                <br />
                <NavLink
                  to="/dashboard/profile/edit"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Button
                    sx={{
                      color: "black",
                    }}
                    startIcon={<Settings sx={{ color: "#878a99" }} />}
                  >
                    Settings
                  </Button>
                </NavLink>

                <Divider />
                <NavLink
                  to="/login"
                  onClick={handleLogout}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Button
                    sx={{
                      color: "black",
                    }}
                    startIcon={<Logout sx={{ color: "#878a99" }} />}
                  >
                    Logout
                  </Button>
                </NavLink>
                <br />
              </Typography>
            </Popover>
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
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
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
