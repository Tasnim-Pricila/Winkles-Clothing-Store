import {
  AppBar,
  Avatar,
  Backdrop,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logout from "../pages/Auth/logout";
import { HowToReg, Login, Logout, MoreVert } from "@mui/icons-material";
import { getMe } from "../../Redux/actions/userActions";

const Header = ({ setSearchText, searchText }) => {
  const pages = ["home", "shop", "blog", "about", "contact"];

  const user = useSelector((state) => state.allUsers.user);
  let cart = user?.cart?.product;
  let wishlist = user?.wishlist?.product;
  const [countCart, setCountCart] = useState(0);
  const [countWishlist, setCountWishlist] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    let count = 0;
    cart?.length > 0 &&
      cart.forEach((item) => {
        count = count + item.qty;
      });
    setCountCart(count);
    wishlist?.length > 0 && setCountWishlist(wishlist?.length);
  }, [dispatch, cart, countCart, user, countWishlist, wishlist]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCart = () => {
    navigate("/cart");
    handleMobileMenuClose();
  };
  const handleWishlist = () => {
    navigate("/wishlist");
    handleMobileMenuClose();
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    handleMobileMenuClose();
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffffff0f",
    boxShadow: 24,
    py: 30,
    px: 60,
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.key === "Enter") {
      setOpen(!open);
      navigate("/shop");
    }
  };
  const handleLogout = () => {
    dispatch(getMe());
    handleCloseUserMenu();
    logout();
    dispatch(getMe());
  };
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ mt: 4 }}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <SearchIcon onClick={handleOpen} />
        </IconButton>
      </MenuItem>
      <MenuItem>
        {user?.wishlist?.product?.length > 0 ? (
          <IconButton size="large" onClick={handleWishlist}>
            <Badge badgeContent={countWishlist} color="warning">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
        ) : (
          <IconButton size="large" onClick={handleWishlist}>
            <Badge color="warning">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
        )}
      </MenuItem>
      <MenuItem>
        {user?.cart?.product?.length > 0 ? (
          <IconButton size="large" onClick={handleCart}>
            <Badge badgeContent={countCart} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        ) : (
          <IconButton size="large" onClick={handleCart}>
            <Badge badgeContent="0" color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )}
      </MenuItem>
      <MenuItem onClick={handleOpenUserMenu}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleMobileMenuClose}>
            <Avatar src={user?.imageUrl ? user?.imageUrl : ""} />
          </IconButton>
        </Tooltip>
      </MenuItem>
    </Menu>
  );
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
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  width: "100%",
                  bgcolor: "#b2acd3f0",
                  borderRadius: "10px",

                  ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
                    color: "black",
                  },
                }}
                name="search"
                placeholder="Search by product name..."
                autoComplete="off"
                onKeyUp={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Fade>
        </Modal>
      </Box>
      <AppBar
        position="static"
        sx={{
          px: { md: 10 },
          bgcolor: "#4b38b3",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {/* Large screen logo  */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                // mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              Winkles
            </Typography>

            {/* Small screen menu icon  */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ px: 0 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages?.map((page) => (
                  <Typography
                    key={page}
                    component={NavLink}
                    onClick={handleCloseNavMenu}
                    to={`/${page}`}
                    sx={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "black",
                      textTransform: "capitalize",
                      display: "block",
                      py: 1,
                      px: 6,
                      ...(location.pathname === `/${page}` && {
                        color: "#FF8E78",
                      }),
                    }}
                  >
                    {" "}
                    {page}
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
                // mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              Winkles
            </Typography>

            {/* Menu Item  */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                gap: 2,
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Typography
                  key={page}
                  component={NavLink}
                  to={`/${page}`}
                  sx={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                    ...(location.pathname === `/${page}` && {
                      color: "#FF8E78",
                    }),
                  }}
                >
                  {" "}
                  {page}
                </Typography>
              ))}
            </Box>

            {/* Settings  */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Menu
                sx={{ mt: { md: 5, xs: -11 } }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {!token ? (
                    <Box sx={{ width: "100px" }}>
                      <NavLink
                        to="/login"
                        style={{
                          textDecoration: "none",
                          textTransform: "uppercase",
                          color: "black",
                          display: "block",
                        }}
                        onClick={handleCloseUserMenu}
                      >
                        <Button
                          sx={{
                            color: "black",
                          }}
                          startIcon={<Login sx={{ color: "#878a99" }} />}
                        >
                          {" "}
                          Login{" "}
                        </Button>
                      </NavLink>
                      <NavLink
                        to="/register"
                        style={{
                          textDecoration: "none",
                          textTransform: "uppercase",
                          color: "black",
                        }}
                        onClick={handleCloseUserMenu}
                      >
                        <Button
                          sx={{
                            color: "black",
                          }}
                          startIcon={<HowToReg sx={{ color: "#878a99" }} />}
                        >
                          {" "}
                          Register{" "}
                        </Button>
                      </NavLink>
                    </Box>
                  ) : (
                    <>
                      <NavLink
                        to="/dashboard"
                        style={{
                          textDecoration: "none",
                          textTransform: "uppercase",
                          color: "black",
                        }}
                      >
                        <Typography onClick={handleCloseUserMenu}>
                          My Dashboard
                        </Typography>
                      </NavLink>
                      <NavLink
                        to="/login"
                        style={{
                          textDecoration: "none",
                          textTransform: "uppercase",
                          color: "black",
                        }}
                      >
                        <Button
                          onClick={handleLogout}
                          sx={{
                            color: "black",
                          }}
                          startIcon={<Logout sx={{ color: "#878a99" }} />}
                        >
                          Logout
                        </Button>
                      </NavLink>
                    </>
                  )}
                </MenuItem>
              </Menu>

              {/* Icon Part  */}

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton sx={{ p: 0, color: "white" }}>
                  <SearchIcon onClick={handleOpen} />
                </IconButton>
                {user?.wishlist?.product?.length > 0 ? (
                  <IconButton
                    sx={{ p: 0, color: "white" }}
                    onClick={handleWishlist}
                  >
                    <Badge badgeContent={countWishlist} color="warning">
                      <FavoriteBorderIcon color="white"></FavoriteBorderIcon>
                    </Badge>
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ p: 0, color: "white" }}
                    onClick={handleWishlist}
                  >
                    <Badge color="warning">
                      <FavoriteBorderIcon color="white"></FavoriteBorderIcon>
                    </Badge>
                  </IconButton>
                )}
                {user?.cart?.product?.length > 0 ? (
                  <IconButton
                    sx={{ p: 0, color: "white" }}
                    onClick={handleCart}
                  >
                    <Badge badgeContent={countCart} color="warning">
                      <ShoppingCartIcon color="white"></ShoppingCartIcon>
                    </Badge>
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ p: 0, color: "white" }}
                    onClick={handleCart}
                  >
                    <Badge badgeContent="0" color="warning">
                      <ShoppingCartIcon color="white"></ShoppingCartIcon>
                    </Badge>
                  </IconButton>
                )}

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={user?.imageUrl ? user?.imageUrl : ""} />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Mobile Icon  */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                  sx={{ px: 0 }}
                >
                  <MoreVert />
                </IconButton>
              </Box>
              {renderMobileMenu}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
