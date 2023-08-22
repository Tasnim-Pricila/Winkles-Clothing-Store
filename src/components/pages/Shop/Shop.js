import { GridView, TableRows } from "@mui/icons-material";
import { Box, Grid, Pagination, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../shared/Footer";
import Loading from "../Loading/Loading";
import AllProducts from "./AllProducts";
import LeftSidebar from "./LeftSidebar";
import ListView from "./ListView";
import { AddToCart, AddToWishlist } from "../../../utils/commonFunction";
import {
  fetchProductsByPagination,
  searchByFilter,
  searchProductsbyPagination,
} from "../../../Redux/actions/productActions";

const Shop = ({ searchText, setSearchText }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const products = useSelector((state) => state.allProducts.products);
  const searched = useSelector((state) => state.allProducts.searchProducts);
  const { products, stock, brand, category, ltPrice, gtPrice } = useSelector(
    (state) => state.allProducts
  );
  const user = useSelector((state) => state.allUsers.user);
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState(1);
  console.log(selectedPage);

  const handleChange = (value) => {
    setSelectedPage(value);
    if (
      location?.state?.value &&
      !stock &&
      !gtPrice &&
      !ltPrice &&
      !category &&
      !brand &&
      searchText === ""
    ) {
      const url = `/products?page=${value}&limit=12&category=${location?.state?.value}`;
      dispatch(searchByFilter(url));
    } else if (!gtPrice && !ltPrice && !stock && !brand && !category) {
      dispatch(fetchProductsByPagination(value));
    } else if (stock && gtPrice && ltPrice && category && brand) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice && ltPrice && category && brand) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice && ltPrice && category) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}`;
      dispatch(searchByFilter(url));
    } else if (stock && gtPrice && ltPrice) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice && ltPrice) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}`;
      dispatch(searchByFilter(url));
    } else if (ltPrice) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&price[lte]=${ltPrice}`;
      dispatch(searchByFilter(url));
    } else if (stock && category && brand) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&stock=${stock}&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (stock) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&stock=${stock}`;
      dispatch(searchByFilter(url));
    } else if (category && brand) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (category) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&category=${category}`;
      dispatch(searchByFilter(url));
    } else if (brand) {
      setSearchText("");
      const url = `/products?page=${value}&limit=12&brand=${brand}`;
      dispatch(searchByFilter(url));
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const page = Math.ceil(products?.count / 12);
  const skip = (selectedPage - 1) * 12;

  const handleClear = () => {
    setSearchText("");
    dispatch(fetchProductsByPagination(selectedPage));
  };

  useEffect(() => {
    if (
      location?.state?.value &&
      !stock &&
      !gtPrice &&
      !ltPrice &&
      !category &&
      !brand &&
      searchText === ""
    ) {
      const url = `/products?page=${selectedPage}&limit=12&category=${location?.state?.value}`;
      dispatch(searchByFilter(url));
    } else if (
      searchText === "" &&
      !location?.state?.value &&
      !gtPrice &&
      !ltPrice &&
      !stock &&
      !brand &&
      !category
    ) {
      dispatch(fetchProductsByPagination(selectedPage));
    } else if (stock && gtPrice && ltPrice && category && brand) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice && ltPrice && category && brand) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice && ltPrice && category) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}`;
      dispatch(searchByFilter(url));
    } else if (stock && gtPrice && ltPrice) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice && ltPrice) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
      dispatch(searchByFilter(url));
    } else if (gtPrice) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}`;
      dispatch(searchByFilter(url));
    } else if (ltPrice) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&price[lte]=${ltPrice}`;
      dispatch(searchByFilter(url));
    } else if (stock && category && brand) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (stock && category) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&category=${category}`;
      dispatch(searchByFilter(url));
    } else if (stock && brand) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (stock) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&stock=${stock}`;
      dispatch(searchByFilter(url));
    } else if (category && brand) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&category=${category}&brand=${brand}`;
      dispatch(searchByFilter(url));
    } else if (category) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&category=${category}`;
      dispatch(searchByFilter(url));
    } else if (brand) {
      setSearchText("");
      const url = `/products?page=${selectedPage}&limit=12&brand=${brand}`;
      dispatch(searchByFilter(url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    stock,
    gtPrice,
    ltPrice,
    category,
    brand,
    setSearchText,
    location?.state?.value,
  ]);

  useEffect(() => {
    if (searchText !== "") {
      dispatch(searchProductsbyPagination(searchText));
    }
  }, [searchText, dispatch, location?.state?.value]);

  const handleGrid = () => {
    setGrid(true);
    setList(false);
  };

  const handleList = () => {
    setGrid(false);
    setList(true);
  };

  let wishlist = user?.wishlist?.product;
  const handleWishlist = (id) => {
    AddToWishlist(user, id, wishlist, dispatch, navigate);
  };
  const allPro = products?.result;
  let newCart = user?.cart?.product;
  const handleAddToCart = (id) => {
    AddToCart(user, id, allPro, newCart, dispatch, navigate);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 2, px: { md: 16, xs: 4 } }}
      >
        <Grid item xs={12} md={3} sx={{ order: { xs: 1, md: 0 } }}>
          <LeftSidebar handleClear={handleClear} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Tooltip title="Grid View">
                <GridView
                  sx={{
                    p: 2,
                    bgcolor: grid ? "black" : "white",
                    color: grid ? "white" : "black",
                    mr: 2,
                    border: 1,
                    cursor: "pointer",
                  }}
                  value="grid"
                  onClick={handleGrid}
                />
              </Tooltip>
              <Tooltip title="List View">
                <TableRows
                  sx={{
                    p: 2,
                    bgcolor: list ? "black" : "white",
                    color: list ? "white" : "black",
                    border: 1,
                    cursor: "pointer",
                  }}
                  onClick={handleList}
                />
              </Tooltip>
            </Box>
            <Typography sx={{ color: "#00000066", py: 1 }}>
              {" "}
              Showing{" "}
              <span style={{ color: "black" }}>
                {skip + 1} -{skip + products?.result?.length} of{" "}
                {products?.count}{" "}
              </span>{" "}
              Products
            </Typography>
          </Box>

          {grid && (
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{
                mt: 2,
              }}
            >
              {searchText === "" ? (
                products?.result?.length > 0 ? (
                  products?.result?.map((product, i) => (
                    <AllProducts
                      key={product._id}
                      product={product}
                      handleAddToCart={handleAddToCart}
                      handleWishlist={handleWishlist}
                      user={user}
                    />
                  ))
                ) : (
                  <Loading />
                )
              ) : searched?.length > 0 ? (
                searched?.map((product) => (
                  <AllProducts
                    key={product._id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleWishlist={handleWishlist}
                  />
                ))
              ) : (
                <Typography
                  sx={{
                    height: "50vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  No search results found{" "}
                </Typography>
              )}
            </Grid>
          )}

          {list && (
            <Box
              sx={{
                mt: 2,
              }}
            >
              {searchText === "" ? (
                products?.result?.length > 0 ? (
                  products?.result?.map((product, i) => (
                    <ListView
                      key={product._id}
                      product={product}
                      handleAddToCart={handleAddToCart}
                      handleWishlist={handleWishlist}
                    />
                  ))
                ) : (
                  <Typography> No search results found </Typography>
                )
              ) : searched.length > 0 ? (
                searched.map((product) => (
                  <ListView
                    key={product._id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleWishlist={handleWishlist}
                  />
                ))
              ) : (
                <Typography> No search results found </Typography>
              )}
            </Box>
          )}
          <Pagination
            count={page}
            color="primary"
            defaultPage={1}
            page={selectedPage}
            onChange={handleChange}
            sx={{
              py: 6,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
};

export default Shop;
