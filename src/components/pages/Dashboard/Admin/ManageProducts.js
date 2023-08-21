import { SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import AddBrand from "./Modal/AddBrand";
import AddCategory from "./Modal/AddCategory";
import ProductTable from "./ProductTable";
import { successBtn } from "../../../../utils/design";
import {
  fetchProducts,
  searchByCatAndBrand,
  searchProducts,
} from "../../../../Redux/actions/productActions";
import { fetchBrands } from "../../../../Redux/actions/brandActions";
import { fetchCategories } from "../../../../Redux/actions/categoryActions";

const ManageProducts = () => {
  const products = useSelector((state) => state.allProducts.allProducts);
  const loading = useSelector((state) => state.allProducts.loading);
  const brands = useSelector((state) => state.brands.brands);
  const categories = useSelector((state) => state.category.categories);
  const searched = useSelector((state) => state.allProducts.searchAllProducts);
  const nav = useNavigate();

  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search !== "") {
      dispatch(searchProducts(search));
    }
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategory = (e) => {
    setValue(e.target.value);
    document.getElementById("standard-search").value = "";
    setSearch("");
    const url = `/products?category=${e.target.value}`;
    dispatch(searchByCatAndBrand(url));
  };

  const handleBrand = (e) => {
    setValue(e.target.value);
    document.getElementById("standard-search").value = "";
    setSearch("");
    const url = `/products?brand=${e.target.value}`;
    dispatch(searchByCatAndBrand(url));
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
        Manage Products
      </Toolbar>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} height="100%">
            <Card
              variant="outlined"
              sx={{
                p: { xs: 2, md: 1, lg: 2 },
                boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
              >
                <Typography>Filters</Typography>
                <Link
                  sx={{
                    cursor: "pointer",
                    color: "#4b38b3",
                    fontSize: "14px",
                    textDecorationColor: "#4b38b3",
                  }}
                  onClick={() => dispatch(fetchProducts())}
                >
                  Clear All
                </Link>
              </Box>
              <Divider></Divider>
              <Box my={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "600" }}>Categories</Typography>
                  <AddCategory></AddCategory>
                </Box>
                {categories?.map((cat) => (
                  <Button
                    variant="text"
                    sx={{
                      color: value === cat?.name ? "#4b38b3" : "#495057",
                      fontWeight: value === cat?.name && "700",
                      fontSize: "14px",
                      display: "block",
                      textTransform: "capitalize",
                      minWidth: 0,
                      paddingBottom: "0",
                    }}
                    value={cat?.name}
                    onClick={handleCategory}
                  >
                    {cat?.name}
                  </Button>
                ))}
              </Box>
              <Divider></Divider>
              <Box my={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography pb={1} sx={{ fontWeight: "600" }}>
                    Brands
                  </Typography>
                  <AddBrand></AddBrand>
                </Box>
                {brands?.map((brand) => (
                  <Button
                    sx={{
                      color: value === brand?.name ? "#4b38b3" : "#495057",
                      fontWeight: value === brand?.name && "700",
                      fontSize: "14px",
                      display: "block",
                      textTransform: "capitalize",
                      minWidth: 0,
                      paddingBottom: "0",
                    }}
                    value={brand?.name}
                    onClick={handleBrand}
                  >
                    {brand?.name}
                  </Button>
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={9} height="100%">
            <Card
              variant="outlined"
              sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  sx={successBtn}
                  onClick={() => nav("/dashboard")}
                >
                  {" "}
                  + Add Product{" "}
                </Button>
                <TextField
                  id="standard-search"
                  type="search"
                  placeholder="Search Products..."
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
                    ".css-1xp6qmi-MuiInputBase-input-MuiOutlinedInput-input": {
                      fontSize: "14px",
                    },
                  }}
                />
              </Box>
              {loading ? (
                <Loading />
              ) : (
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table aria-label="simple table" stickyHeader>
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
                        <TableCell> Product </TableCell>
                        <TableCell> Stock </TableCell>
                        <TableCell> Price </TableCell>
                        <TableCell> Brand </TableCell>
                        <TableCell> Action </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {search === "" ? (
                        products?.length > 0 ? (
                          products?.map((product) => (
                            <ProductTable product={product}></ProductTable>
                          ))
                        ) : (
                          <Typography> No results found </Typography>
                        )
                      ) : searched?.length > 0 ? (
                        searched?.map((product) => (
                          <ProductTable product={product}></ProductTable>
                        ))
                      ) : (
                        <Typography> No results found </Typography>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ManageProducts;
