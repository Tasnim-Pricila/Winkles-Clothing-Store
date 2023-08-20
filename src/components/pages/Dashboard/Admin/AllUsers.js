import { Block, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { successBtn } from "../../../../utils/design";
import {
  getUsers,
  searchUsers,
  updateUserById,
} from "../../../../Redux/actions/userActions";

const AllUsers = () => {
  const users = useSelector((state) => state.allUsers.users);
  const searchedUser = useSelector((state) => state.allUsers.searchUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (search !== "") {
      dispatch(searchUsers(search));
    }
  }, [dispatch, search]);

  const handleBlock = (id) => {
    dispatch(getUsers());
    dispatch(
      updateUserById(id, {
        status: "blocked",
      })
    );
    dispatch(getUsers());
  };
  const handleActive = (id) => {
    dispatch(getUsers());
    dispatch(
      updateUserById(id, {
        status: "active",
      })
    );
    dispatch(getUsers());
  };

  return (
    <Box mb={4}>
      <Toolbar
        sx={{
          boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#495057",
        }}
      >
        All Users
      </Toolbar>
      {users?.length !== 0 ? (
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Card
                variant="outlined"
                sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={successBtn}
                    onClick={() => navigate("/soon")}
                  >
                    {" "}
                    + Add User{" "}
                  </Button>
                  <TextField
                    id="standard-search"
                    type="search"
                    placeholder="Search users by name or email..."
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                      ".css-1xp6qmi-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          fontSize: "14px",
                        },
                      width: "300px",
                    }}
                  />
                </Box>
                <Divider />
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader aria-label="simple table">
                    <TableHead sx={{ bgcolor: "#f3f6f9" }}>
                      <TableRow
                        sx={{
                          ".MuiTableCell-root": {
                            color: "#878a99",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: "bold" }}> # </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {" "}
                          User{" "}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {" "}
                          Email{" "}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {" "}
                          Phone{" "}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {" "}
                          Joining Date{" "}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {" "}
                          Status{" "}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {" "}
                          Action{" "}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {search === "" ? (
                        users?.map((user, i) => (
                          <TableRow>
                            <TableCell> {i + 1} </TableCell>
                            <TableCell>
                              {" "}
                              {user.firstName} {user.lastName}{" "}
                            </TableCell>
                            <TableCell> {user.email} </TableCell>
                            <TableCell> {user?.phone} </TableCell>
                            <TableCell> {user.createdAt} </TableCell>
                            <TableCell>
                              <Typography
                                sx={{
                                  bgcolor:
                                    user?.status === "blocked"
                                      ? "rgba(240,101,72,.23)"
                                      : "rgba(69,203,133,.23)",
                                  color:
                                    user?.status === "blocked"
                                      ? "#f06548"
                                      : "#45cb85",
                                  fontSize: "11px",
                                  fontWeight: "bold",
                                  letterSpacing: "1px",
                                  padding: "5px 4px",
                                  borderRadius: "5px",
                                  textAlign: "center",
                                }}
                              >
                                {user?.status}
                              </Typography>
                            </TableCell>
                            {user?.status === "active" ? (
                              <TableCell>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: "#f06548",
                                    "&:hover": {
                                      bgcolor: "#f06548",
                                    },
                                  }}
                                  endIcon={<Block fontSize="small" />}
                                  onClick={() => handleBlock(user._id)}
                                >
                                  Block
                                </Button>
                              </TableCell>
                            ) : (
                              <TableCell>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => handleActive(user._id)}
                                >
                                  Activate
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))
                      ) : searchedUser?.length > 0 ? (
                        searchedUser?.map((user, i) => (
                          <TableRow>
                            <TableCell> {i + 1} </TableCell>
                            <TableCell>
                              {" "}
                              {user.firstName} {user.lastName}{" "}
                            </TableCell>
                            <TableCell> {user.email} </TableCell>
                            <TableCell> {user?.phone} </TableCell>
                            <TableCell> {user.createdAt} </TableCell>
                            <TableCell>
                              <Typography
                                sx={{
                                  bgcolor:
                                    user?.status === "blocked"
                                      ? "rgba(240,101,72,.23)"
                                      : "rgba(69,203,133,.23)",
                                  color:
                                    user?.status === "blocked"
                                      ? "#f06548"
                                      : "#45cb85",
                                  fontSize: "11px",
                                  fontWeight: "bold",
                                  letterSpacing: "1px",
                                  padding: "5px 4px",
                                  borderRadius: "5px",
                                  textAlign: "center",
                                }}
                              >
                                {user?.status}
                              </Typography>
                            </TableCell>
                            {user?.status === "active" ? (
                              <TableCell>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    bgcolor: "#f06548",
                                    "&:hover": {
                                      bgcolor: "#f06548",
                                    },
                                  }}
                                  endIcon={<Block fontSize="small" />}
                                  onClick={() => handleBlock(user._id)}
                                >
                                  Block
                                </Button>
                              </TableCell>
                            ) : (
                              <TableCell>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => handleActive(user._id)}
                                >
                                  Activate
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))
                      ) : (
                        <Typography> No results found </Typography>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default AllUsers;
