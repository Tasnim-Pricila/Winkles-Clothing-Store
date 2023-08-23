import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CameraAlt } from "@mui/icons-material";
import axios from "axios";
import avatar from "../../../images/avatar.png";
import { toast } from "react-toastify";
import { successBtn, dangerBtn } from "../../../utils/design";
import { updateUserAction } from "../../../Redux/actions/userActions";

const EditProfile = () => {
  const { user } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, email, imageUrl, createdAt } = user;

  // image upload
  const imgStorageKey = "966d2411c1e18d4935625f7409fb75e7";
  const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

  const [myImage, setImage] = useState("");
  const [imagePreview, setPreview] = useState("");

  const getImage = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    const formData = new FormData();
    formData.append("image", myImage);

    if (myImage) {
      await axios.post(url, formData).then(async (response) => {
        if (response?.data?.success) {
          imgUrl = response?.data?.data?.url;
        }
      });
    }
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      country: e.target.country.value,
      imageUrl: imgUrl ? imgUrl : imageUrl,
    };
    await dispatch(updateUserAction(data));
    navigate("/dashboard/profile");
    toast.success("Profile Updated Successfully ", {
      theme: "colored",
    });
  };

  const removePhoto = async () => {
    await dispatch(
      updateUserAction({
        imageUrl: "",
      })
    );
    navigate("/dashboard/profile");
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
        Edit Profile
      </Toolbar>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
                padding: "20px 40px",
              }}
            >
              <form onSubmit={handleUpdate}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="label"
                      for="image"
                      sx={{ cursor: "pointer" }}
                    >
                      <Avatar
                        src={
                          myImage ? imagePreview : imageUrl ? imageUrl : avatar
                        }
                        alt=""
                        sx={{
                          border: "3px solid #eee8e8",
                          width: 100,
                          height: 100,
                          display: "inline-block",
                          backgroundColor: "#aaacb85c",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <Button
                      variant="outlined"
                      component="label"
                      for="image"
                      sx={{
                        borderRadius: "50%",
                        minWidth: "0px",
                        px: 0,
                        py: 0,
                        p: 2,
                        width: "10px",
                        height: "10px",
                        bgcolor: "#ffffff94",
                        borderColor: "transparent",
                        "&:hover": {
                          bgcolor: "#aaacb8",
                          borderColor: "transparent",
                        },
                        position: "absolute",
                        bottom: "15px",
                        right: "-5px",
                      }}
                    >
                      <CameraAlt sx={{ color: "black" }} fontSize="small" />
                      <input
                        type="file"
                        name="image"
                        id="image"
                        hidden
                        onChange={getImage}
                      />
                    </Button>
                  </Box>
                  <Box>
                    <Typography
                      width="100%"
                      textTransform="uppercase"
                      fontWeight="bold"
                    >
                      {" "}
                      {firstName} {lastName}{" "}
                    </Typography>
                    {imageUrl && (
                      <Typography
                        onClick={removePhoto}
                        sx={{
                          fontSize: "10px",
                          mt: 1,
                          bgcolor: "#aaacb85c",
                          padding: "5px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                      >
                        Remove Profile Photo
                      </Typography>
                    )}
                  </Box>
                </Box>
                {user?.length !== 0 && (
                  <Box>
                    <Grid
                      container
                      spacing={2}
                      mt={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <Typography textAlign="right" pr={20}>
                          {" "}
                          First Name{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          sx={{
                            width: "100%",
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontSize: "13px",
                                color: "#212529",
                              },
                          }}
                          defaultValue={user?.firstName && user?.firstName}
                          autoComplete="off"
                          id="filled-hidden-label-small"
                          size="small"
                          name="firstName"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      mt={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <Typography textAlign="right" pr={20}>
                          Last Name{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          sx={{
                            width: "100%",
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontSize: "13px",
                                color: "#212529",
                              },
                          }}
                          defaultValue={user?.lastName && user?.lastName}
                          id="filled-hidden-label-small"
                          name="lastName"
                          size="small"
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      mt={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <Typography textAlign="right" pr={20}>
                          {" "}
                          Email{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          sx={{
                            width: "100%",
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontSize: "13px",
                                color: "#212529",
                              },
                          }}
                          value={email}
                          id="filled-hidden-label-small"
                          size="small"
                          disabled
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      mt={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <Typography textAlign="right" pr={20}>
                          {" "}
                          Phone{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          sx={{
                            width: "100%",
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontSize: "13px",
                                color: "#212529",
                              },
                          }}
                          defaultValue={user?.phone && user?.phone}
                          id="filled-hidden-label-small"
                          size="small"
                          name="phone"
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      mt={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <Typography textAlign="right" pr={20}>
                          {" "}
                          Address{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          sx={{
                            width: "100%",
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontSize: "13px",
                                color: "#212529",
                              },
                          }}
                          defaultValue={user?.address && user?.address}
                          id="filled-hidden-label-small"
                          size="small"
                          name="address"
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      mt={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <Typography textAlign="right" pr={20}>
                          {" "}
                          Country{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          sx={{
                            width: "100%",
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontSize: "13px",
                                color: "#212529",
                              },
                          }}
                          defaultValue={user?.country && user.country}
                          id="filled-hidden-label-small"
                          size="small"
                          name="country"
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      mt={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item md={4}>
                        <Typography textAlign="right" pr={20}>
                          {" "}
                          Joined on{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          sx={{
                            width: "100%",
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                fontSize: "13px",
                                color: "#212529",
                              },
                          }}
                          value={createdAt}
                          id="filled-hidden-label-small"
                          size="small"
                          disabled
                        />
                      </Grid>
                    </Grid>

                    <Box
                      mt={3}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "12px",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={successBtn}
                        type="submit "
                      >
                        {" "}
                        Save{" "}
                      </Button>
                      <Button
                        variant="contained"
                        sx={dangerBtn}
                        onClick={() => navigate("/dashboard/profile")}
                      >
                        {" "}
                        Cancel{" "}
                      </Button>
                    </Box>
                  </Box>
                )}
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditProfile;
