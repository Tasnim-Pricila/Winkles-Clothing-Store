import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Footer from "../../shared/Footer";
import { Link as Routerlink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { fetchBlogs } from "../../../Redux/actions/blogActions";
import BlogCard from "../../../UI/BlogCard";

const Blogs = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const blogs = useSelector((state) => state.blogs.blogs);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleClick = (id) => {
    nav("/soon");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { md: 16, xs: 4 },
          py: 5,
          bgcolor: "#FF8E78",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          Blogs
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" underline="hover" color="inherit" component={Routerlink}>
            Home
          </Link>
          <Typography color="text.primary">Blogs</Typography>
        </Breadcrumbs>
      </Box>

      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          mt: 4,
          px: { md: 16, xs: 4 },
          mb: 10,
        }}
      >
        {blogs?.length > 0 ? (
          blogs?.map((blog) => (
            <BlogCard blog={blog} handleClick={handleClick} />
          ))
        ) : (
          <Loading />
        )}
      </Grid>
      <Footer></Footer>
    </>
  );
};

export default Blogs;
