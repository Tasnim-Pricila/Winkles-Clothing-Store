import { Avatar, Card, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import RatingModal from "./RatingModal";

const Reviews = ({ reviews, id, user }) => {
  const [allReviews, setAllReviews] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
        mx: { md: 16, xs: 4 },
        mb: 10,
      }}
    >
      {user?.length !== 0 ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Share your thoughts with other customers
            </Typography>
            <Typography fontWeight="bold" mt={1}>
              All Reviews ({reviews?.length})
            </Typography>
          </Box>
          <Box>
            <RatingModal id={id}> </RatingModal>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            All Reviews {reviews?.length}
          </Typography>
          <Box>
            <Typography>**Login to add a review</Typography>
          </Box>
        </Box>
      )}
      <Box mt={4}>
        {reviews?.length > 0 ? (
          reviews?.slice(0, 5).map((review, i) => (
            <>
              <Box mb={3}>
                <Box
                  sx={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
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
            </>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            No Reviews Yet
          </Typography>
        )}
        {!allReviews && reviews?.length > 5 && (
          <Typography
            onClick={() => setAllReviews(true)}
            sx={{
              cursor: "pointer",
              color: "#FF8E78",
              textDecoration: "underline",
            }}
          >
            See All Reviews
          </Typography>
        )}
        {allReviews &&
          reviews?.slice(5)?.map((review, i) => (
            <>
              <Box mb={3}>
                <Box
                  sx={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
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
            </>
          ))}
      </Box>
    </Card>
  );
};

export default Reviews;
