import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { fetchBlogs } from "../../../Redux/actions/blogActions";
import { memo } from "react";
import BlogCard from "../../../UI/BlogCard";

const Article = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleClick = () => {
    nav("/soon");
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          pt: 10,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "bold",
          fontSize: "26px",
        }}
      >
        Latest From Blog
      </Typography>

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
          blogs
            .slice(-3)
            .reverse()
            ?.map((blog) => <BlogCard blog={blog} handleClick={handleClick} />)
        ) : (
          <Loading />
        )}
      </Grid>
    </Box>
  );
};

export default memo(Article);
