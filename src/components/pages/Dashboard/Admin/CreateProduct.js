import { CameraAlt, CloudUpload } from "@mui/icons-material";
import {
  Button,
  Card,
  Divider,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { successBtn } from "../../../../utils/design";
import { fetchBrands } from "../../../../Redux/actions/brandActions";
import { fetchCategories } from "../../../../Redux/actions/categoryActions";
import { postProduct } from "../../../../Redux/actions/productActions";

const CreateProduct = () => {
  const brands = useSelector((state) => state.brands.brands);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    unit: "",
    category: "",
    brand: "",
    stock: "",
    discount: "",
  });
  const [error, setError] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    unit: "",
    category: "",
    brand: "",
    stock: "",
    myImage: "",
    gallery: "",
  });

  const [myImage, setImage] = useState("");
  const [imagePreview, setPreview] = useState();
  const getImage = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0])); //set preview
  };

  let gallery = [];
  let galleryPreview = [];
  const [galleryImg, setGalleryImg] = useState([
    {
      gallery: "",
      galleryPreview: "",
    },
  ]);

  const galleryImage = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      galleryPreview.push(URL.createObjectURL(e.target.files[i]));
      gallery.push(e.target.files[i]);
    }
    setGalleryImg({ gallery, galleryPreview });
  };

  const imgStorageKey = "966d2411c1e18d4935625f7409fb75e7";
  const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

  const addProduct = async (e) => {
    e.preventDefault();
    let imgGalleryUrl = [];
    let imgUrl = "";
    const formData = new FormData();
    formData.append("image", myImage);
    const formGallery = new FormData();
    if (productDetails.title === "") {
      setError({ title: "This field is required" });
    } else if (productDetails.description === "") {
      setError({ description: "This field is required" });
    } else if (myImage === "") {
      setError({ myImage: "This field is required" });
    } else if (productDetails.quantity === "") {
      setError({ quantity: "This field is required" });
    } else if (productDetails.unit === "") {
      setError({ unit: "This field is required" });
    } else if (productDetails.price === "") {
      setError({ price: "This field is required" });
    } else if (productDetails.price < 0) {
      setError({ price: "Price can not be less than 0" });
    } else if (productDetails.discount < 0) {
      setError({ discount: "Discount can not be less than 0" });
    } else if (productDetails.brand === "") {
      setError({ brand: "This field is required" });
    } else if (productDetails.category === "") {
      setError({ category: "This field is required" });
    } else if (productDetails.stock === "") {
      setError({ stock: "This field is required" });
    } else {
      if (myImage) {
        await axios.post(url, formData).then(async (response) => {
          if (response?.data?.success) {
            imgUrl = response?.data?.data?.url;
          }
        });
      }
      if (galleryImg[0]?.gallery !== "") {
        const galleryPromises = [...galleryImg?.gallery]?.map(
          async (image, i) => {
            formGallery.append("image", image);
            const response = await axios.post(url, formGallery);
            if (response?.data?.success) {
              imgGalleryUrl.push(response?.data?.data?.url);
            }
          }
        );
        await Promise.all(galleryPromises);
      }
      const data = {
        ...productDetails,
        image: imgUrl,
        imageGallery: imgGalleryUrl,
      };
      dispatch(postProduct(data));
      nav("/dashboard/manageProducts");
    }
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
        Add Product
      </Toolbar>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} height="100%">
            <Card
              variant="outlined"
              sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)" }}
            >
              <Box>
                <Typography
                  variant="body2"
                  pb={1}
                  fontWeight="600"
                  color="#212529eb"
                >
                  Product Title
                </Typography>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  hiddenLabel
                  required
                  type="text"
                  id="filled-hidden-label-small"
                  size="small"
                  placeholder="Enter product title"
                  onChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      title: e.target.value,
                    })
                  }
                  error={error.title}
                  helperText={error.title}
                />
              </Box>
              <Box mt={2}>
                <Typography
                  variant="body2"
                  pb={1}
                  fontWeight="600"
                  color="#212529eb"
                >
                  Product Description
                </Typography>
                <Editor
                  onEditorChange={(evt, editor) =>
                    setProductDetails({
                      ...productDetails,
                      description: editor.getContent(),
                    })
                  }
                  init={{
                    height: 300,
                    menubar: false,
                    forced_root_block: "",
                    selector: "textarea",
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Mulish,Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                <Typography sx={{ color: "#d32f2f", fontSize: "13px", pt: 1 }}>
                  {error.description}
                </Typography>
              </Box>
            </Card>
            <Card
              variant="outlined"
              sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)", mt: 3 }}
            >
              <Typography pb={1}>Product Gallery</Typography>
              <Divider></Divider>
              <Box mt={2}>
                <Typography
                  variant="body2"
                  pb={1}
                  fontWeight="600"
                  color="#212529eb"
                >
                  Product Image
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "13px",
                    color: "GrayText",
                  }}
                >
                  Add Product main Image.
                </Typography>

                <Box
                  p={10}
                  component="label"
                  for="image"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <Box>
                    <img
                      src={imagePreview}
                      alt=""
                      style={{
                        width: "100px",
                        height: "100px",
                        display: "inline-block",
                        backgroundColor: "#878a997a",
                        padding: "10px",
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
                      p: 3,
                      width: "24px",
                      height: "24px",
                      bgcolor: "#aaacb8",
                      borderColor: "transparent",
                      "&:hover": {
                        bgcolor: "#aaacb8",
                        borderColor: "transparent",
                      },
                      position: "absolute",
                      bottom: "22%",
                      right: "39%",
                      zIndex: 999,
                    }}
                  >
                    <CameraAlt sx={{ color: "#4b38b3" }} />
                    <input
                      type="file"
                      name="image"
                      id="image"
                      hidden
                      onChange={getImage}
                    />
                  </Button>
                </Box>
                <FormHelperText
                  sx={{
                    color: "#d32f2f",
                    textAlign: "center",
                    fontSize: "13px",
                    pb: 6,
                  }}
                >
                  {" "}
                  {error.myImage}{" "}
                </FormHelperText>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  pb={1}
                  fontWeight="600"
                  color="#212529eb"
                >
                  Product Image
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "13px",
                    color: "GrayText",
                  }}
                >
                  Add Product Gallery Images.
                </Typography>
                <Box
                  component="label"
                  for="gallery"
                  mt={2}
                  p={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    border: "1px solid gray",
                    borderStyle: "dashed",
                    borderRadius: "1%",
                    cursor: "pointer",
                  }}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    for="gallery"
                    sx={{
                      borderColor: "transparent",
                      "&:hover": {
                        borderColor: "transparent",
                        bgColor: "transparent",
                      },
                    }}
                  >
                    <CloudUpload sx={{ fontSize: "50px", color: "#4b38b3" }} />
                    <input
                      type="file"
                      name="image1"
                      id="gallery"
                      multiple
                      hidden
                      accpet="image/jpg"
                      onChange={galleryImage}
                    />
                  </Button>
                  <Typography> Click to upload photos </Typography>
                </Box>
                <FormHelperText
                  sx={{
                    color: "#d32f2f",
                    textAlign: "center",
                    fontSize: "13px",
                  }}
                >
                  {" "}
                  {error.gallery}{" "}
                </FormHelperText>
                {galleryImg?.galleryPreview?.map((g, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      gap: "5px",
                      mt: 1,
                      border: "1px solid #ded8d8",
                      borderRadius: "5px",
                      p: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box>
                        <img
                          src={g}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                            display: "inline-block",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <Typography variant="body2">
                          {galleryImg?.gallery[i]?.name}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {galleryImg?.gallery[i]?.size / 1000} KB
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
            <Card
              variant="outlined"
              sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)", mt: 3 }}
            >
              <Typography pb={1}>General Info</Typography>
              <Divider></Divider>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    pb={1}
                    fontWeight="600"
                    color="#212529eb"
                  >
                    Stock
                  </Typography>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    hiddenLabel
                    required
                    type="number"
                    id="filled-hidden-label-small"
                    size="small"
                    placeholder="Enter stocks"
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        quantity: e.target.value,
                      })
                    }
                    error={error.quantity}
                    helperText={error.quantity}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    pb={1}
                    fontWeight="600"
                    color="#212529eb"
                  >
                    Unit
                  </Typography>
                  <Select
                    size="small"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    displayEmpty
                    label="Age"
                    value={productDetails.unit}
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        unit: e.target.value,
                      })
                    }
                    sx={{ width: "100%" }}
                    error={error.unit}
                  >
                    <MenuItem disabled selected value="">
                      <em>Select Unit</em>
                    </MenuItem>
                    <MenuItem value="pcs" sx={{ textTransform: "capitalize" }}>
                      pcs
                    </MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {" "}
                    {error.unit}{" "}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    pb={1}
                    fontWeight="600"
                    color="#212529eb"
                  >
                    Price
                  </Typography>
                  <TextField
                    sx={{
                      width: "100%",
                      ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          fontSize: "13px",
                          color: "#212529",
                        },
                    }}
                    hiddenLabel
                    required
                    type="number"
                    id="filled-hidden-label-small"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      inputProps: {
                        min: 0,
                      },
                    }}
                    placeholder="Enter price"
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        price: e.target.value,
                      })
                    }
                    error={error.price}
                    helperText={error.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    pb={1}
                    fontWeight="600"
                    color="#212529eb"
                  >
                    Discount
                  </Typography>
                  <TextField
                    sx={{
                      width: "100%",
                      ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          fontSize: "13px",
                          color: "#212529",
                        },
                    }}
                    hiddenLabel
                    type="number"
                    id="filled-hidden-label-small"
                    size="small"
                    min="0"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                    }}
                    placeholder="Enter Discount"
                    onChange={(e) =>
                      setProductDetails({
                        ...productDetails,
                        discount: e.target.value,
                      })
                    }
                    error={error.discount}
                    helperText={error.discount}
                  />
                </Grid>
              </Grid>
            </Card>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                mt: 6,
              }}
            >
              <Button variant="contained" sx={successBtn} onClick={addProduct}>
                {" "}
                Submit{" "}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} height="100%">
            <Card
              variant="outlined"
              sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)" }}
            >
              <Typography pb={1}>Product Brands </Typography>
              <Divider></Divider>
              <Typography
                variant="body2"
                py={2}
                fontWeight="600"
                color="#212529eb"
              >
                Select product brand
              </Typography>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                displayEmpty
                label="Age"
                value={productDetails.brand}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    brand: e.target.value,
                  })
                }
                sx={{ width: "100%" }}
                error={error.brand}
              >
                <MenuItem disabled selected value="">
                  <em>Select Brand</em>
                </MenuItem>
                {brands?.map((brand) => (
                  <MenuItem
                    key={brand?._id}
                    value={brand?.name}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {brand?.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {" "}
                {error.brand}{" "}
              </FormHelperText>
            </Card>

            <Card
              variant="outlined"
              sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)", mt: 2 }}
            >
              <Typography pb={1}> Product Categories </Typography>
              <Divider></Divider>
              <Typography
                variant="body2"
                py={2}
                fontWeight="600"
                color="#212529eb"
              >
                Select product category
              </Typography>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                displayEmpty
                label="Age"
                value={productDetails.category}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    category: e.target.value,
                  })
                }
                sx={{ width: "100%" }}
                error={error.category}
              >
                <MenuItem disabled selected value="">
                  <em>Select Category</em>
                </MenuItem>
                {categories?.map((category) => (
                  <MenuItem
                    key={category?._id}
                    value={category?.name}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {category?.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {" "}
                {error.category}{" "}
              </FormHelperText>
            </Card>

            <Card
              variant="outlined"
              sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)", mt: 2 }}
            >
              <Typography pb={1}> Product Availability </Typography>
              <Divider></Divider>
              <Typography
                variant="body2"
                py={2}
                fontWeight="600"
                color="#212529eb"
              >
                {" "}
                Status{" "}
              </Typography>
              <Select
                displayEmpty
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                placeholder="Select category"
                sx={{ width: "100%" }}
                value={productDetails.stock}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    stock: e.target.value,
                  })
                }
                error={error.stock}
              >
                <MenuItem disabled selected value="">
                  <em>Select stock</em>
                </MenuItem>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </Select>
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {" "}
                {error.stock}{" "}
              </FormHelperText>
            </Card>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-end",
            mt: 6,
          }}
        >
          <Button variant="contained" sx={successBtn} onClick={addProduct}>
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProduct;
