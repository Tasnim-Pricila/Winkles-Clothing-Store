import { Avatar, Box, Rating, Typography } from "@mui/material";
import React from "react";

const ReviewCard = ({review}) => {
  return (
    <Box mb={3}>
      <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Avatar src={review?.avatar ? review?.avatar : ""} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography fontWeight="bold" sx={{ fontSize: "15px" }}>
            {review.postedBy}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              fontSize: "14px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Rating
              name="read-only"
              size="small"
              value={review.rating}
              precision={0.5}
              readOnly
            />
            {review.summary}
          </Typography>
        </Box>
      </Box>
      <Typography mt={1} sx={{ fontSize: "15px" }}>
        {" "}
        {review?.review}{" "}
      </Typography>
    </Box>
  );
};

export default ReviewCard;
