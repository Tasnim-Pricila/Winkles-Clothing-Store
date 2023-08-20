import {
  Button,
  Card,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { CameraAlt, CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { successBtn } from "../../../../utils/design";
import {
  fetchProduct,
  removeSelectedProduct,
  updateProduct,
} from "../../../../Redux/actions/productActions";
import { fetchBrands } from "../../../../Redux/actions/brandActions";
import { fetchCategories } from "../../../../Redux/actions/categoryActions";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const product = useSelector((state) => state.allProducts.product);
  const brands = useSelector((state) => state.brands.brands);
  const categories = useSelector((state) => state.category.categories);
  // eslint-disable-next-line no-unused-vars
  const [des, setDes] = useState("");

  useEffect(() => {
    dispatch(fetchProduct(id));
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  const images = product?.imageGallery?.filter((image) => image);

  const [myImage, setImage] = useState("");
  const [imagePreview, setPreview] = useState("");

  const getImage = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0])); //set preview
  };

  const [galleryImg, setGalleryImg] = useState([
    {
      gallery: "",
      galleryPreview: "",
    },
  ]);

  let gallery = [];
  let galleryPreview = [];

  const galleryImage = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      galleryPreview.push(URL.createObjectURL(e.target.files[i]));
      gallery.push(e.target.files[i]);
    }
    setGalleryImg({ gallery, galleryPreview });
  };

  const imgStorageKey = "966d2411c1e18d4935625f7409fb75e7";
  const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

  const handleEdit = async (e) => {
    e.preventDefault();
    let imgGalleryUrl = [];
    let imgUrl = "";

    const formData = new FormData();
    formData.append("image", myImage);

    if (myImage && galleryImg?.gallery) {
      await axios.post(url, formData).then((response) => {
        if (response?.data?.success) {
          imgUrl = response?.data?.data?.url;
          const formGallery = new FormData();
          [...galleryImg?.gallery].forEach((image, i) => {
            formGallery.append("image", image);
            axios.post(url, formGallery).then((response) => {
              if (response?.data?.success) {
                imgGalleryUrl.push(response?.data?.data?.url);
                if (i === galleryImg?.gallery?.length - 1) {
                  const data = {
                    title: e.target.title.value,
                    description: e.target.description.value,
                    price: e.target.price.value,
                    discount: e.target.discount.value,
                    quantity: e.target.quantity.value,
                    unit: e.target.unit.value,
                    image: imgUrl,
                    imageGallery: imgGalleryUrl,
                    category: e.target.category.value,
                    brand: e.target.brand.value,
                    stock: e.target.stock.value,
                  };
                  // console.log(data)
                  dispatch(updateProduct(id, data));
                  nav("/dashboard/manageProducts");
                }
              }
            });
          });
        }
      });
    } else if (myImage) {
      await axios.post(url, formData).then((response) => {
        if (response?.data?.success) {
          imgUrl = response?.data?.data?.url;
          const data = {
            title: e.target.title.value,
            description: e.target.description.value,
            price: e.target.price.value,
            discount: e.target.discount.value,
            quantity: e.target.quantity.value,
            unit: e.target.unit.value,
            image: imgUrl,
            imageGallery: images,
            category: e.target.category.value,
            brand: e.target.brand.value,
            stock: e.target.stock.value,
          };
          // console.log(data)
          dispatch(updateProduct(id, data));
          nav("/dashboard/manageProducts");
        }
      });
    } else if (galleryImg?.gallery) {
      const formGallery = new FormData();
      [...galleryImg?.gallery].forEach((image, i) => {
        formGallery.append("image", image);
        axios.post(url, formGallery).then((response) => {
          // console.log('second one', response)
          if (response?.data?.success) {
            imgGalleryUrl.push(response?.data?.data?.url);
            if (i === galleryImg?.gallery?.length - 1) {
              const data = {
                title: e.target.title.value,
                description: e.target.description.value,
                price: e.target.price.value,
                discount: e.target.discount.value,
                quantity: e.target.quantity.value,
                unit: e.target.unit.value,
                image: product?.image,
                imageGallery: imgGalleryUrl,
                category: e.target.category.value,
                brand: e.target.brand.value,
                stock: e.target.stock.value,
              };
              // console.log(data)
              dispatch(updateProduct(id, data));
              nav("/dashboard/manageProducts");
            }
          }
        });
      });
    } else {
      const data = {
        title: e.target.title.value,
        description: e.target.description.value,
        price: e.target.price.value,
        discount: e.target.discount.value,
        quantity: e.target.quantity.value,
        unit: e.target.unit.value,
        image: product?.image,
        imageGallery: images,
        category: e.target.category.value,
        brand: e.target.brand.value,
        stock: e.target.stock.value,
      };
      // console.log(data)
      dispatch(updateProduct(id, data));
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
        Edit Product
      </Toolbar>
      <Box p={3}>
        {product?.length !== 0 && (
          <>
            <form onSubmit={handleEdit}>
              <Grid container spacing={2}>
                <Grid item md={7} height="100%">
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
                          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              fontSize: "13px",
                              color: "#212529",
                            },
                        }}
                        hiddenLabel
                        required
                        type="text"
                        id="filled-hidden-label-small"
                        size="small"
                        placeholder="Enter product title"
                        name="title"
                        defaultValue={product?.title}
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
                        textareaName="description"
                        initialValue={product?.description}
                        onEditorChange={(newValue, editor) => setDes(newValue)}
                        init={{
                          height: 300,
                          menubar: false,
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
                    </Box>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
                      mt: 3,
                    }}
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
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <Box>
                          {myImage ? (
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
                          ) : (
                            <img
                              src={product?.image}
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
                          )}
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
                        }}
                      >
                        {!galleryImg?.galleryPreview && (
                          <Box sx={{ display: "flex" }}>
                            {images.map((image) => (
                              <img
                                src={image}
                                alt=""
                                style={{
                                  width: "100px",
                                  height: "100px",
                                }}
                              />
                            ))}
                          </Box>
                        )}

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
                          <CloudUpload
                            sx={{ fontSize: "50px", color: "#4b38b3" }}
                          />
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

                      {galleryImg?.gallery ? (
                        galleryImg?.galleryPreview?.map((g, i) => (
                          <Box
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
                                <Typography
                                  variant="subtitle2"
                                  fontWeight="bold"
                                >
                                  {galleryImg?.gallery[i]?.size / 1000} KB
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
                      mt: 3,
                    }}
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
                          placeholder="Enter stocks"
                          name="quantity"
                          defaultValue={product?.quantity}
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
                          type="text"
                          id="filled-hidden-label-small"
                          size="small"
                          placeholder="Enter unit"
                          name="unit"
                          defaultValue={product?.unit}
                        />
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
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Enter price"
                          name="price"
                          defaultValue={product?.price}
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Enter price"
                          name="discount"
                          defaultValue={product?.discount}
                        />
                      </Grid>
                    </Grid>
                  </Card>
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
                      name="brand"
                      defaultValue={product?.brand}
                      sx={{ width: "100%" }}
                    >
                      <MenuItem disabled selected value="">
                        <em>Select Brand</em>
                      </MenuItem>
                      {brands?.map((brand) => (
                        <MenuItem
                          value={brand?.name}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {brand?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
                      mt: 2,
                    }}
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
                      name="category"
                      defaultValue={product?.category}
                      sx={{ width: "100%" }}
                    >
                      <MenuItem disabled selected value="">
                        <em>Select Category</em>
                      </MenuItem>
                      {categories?.map((category) => (
                        <MenuItem
                          value={category?.name}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {category?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
                      mt: 2,
                    }}
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
                      sx={{ width: "100%" }}
                      name="stock"
                      defaultValue={product?.stock}
                    >
                      <MenuItem disabled selected value="">
                        <em>Select stock</em>
                      </MenuItem>
                      <MenuItem value="In Stock">In stock</MenuItem>
                      <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                    </Select>
                  </Card>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Button variant="contained" type="submit" sx={successBtn}>
                  {" "}
                  Update Product{" "}
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </Box>
  );
};

export default EditProduct;
