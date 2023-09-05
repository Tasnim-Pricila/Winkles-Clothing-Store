import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, handleClick }) => {
  return (
    <Grid
      item
      md={4}
      key={blog._id}
      sx={{
        "&:hover img": {
          transform: "scale(1.2)",
        },
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <img
          src={blog?.imageUrl}
          alt=""
          width="100%"
          style={{
            transition: "3s ease-in-out",
            cursor: "pointer",
          }}
        />
      </Box>
      <Typography color="#A4A4A4" pt={1} pb={2}>
        {blog?.createdAt}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          "&:hover": { color: "#FF8E78", transitionDuration: ".5s" },
          cursor: "pointer",
          pr: 4,
        }}
      >
        {blog?.title}
      </Typography>
      <Typography py={2}>{blog?.description}</Typography>
      <Link
        onClick={() => handleClick()}
        sx={{
          cursor: "pointer",
          color: "#A4A4A4",
          textDecorationColor: "#A4A4A4",
          "&:hover": { color: "#FF8E78", transitionDuration: ".5s" },
        }}
      >
        Read More
      </Link>
    </Grid>
  );
};

export default BlogCard;
