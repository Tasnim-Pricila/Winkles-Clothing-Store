import {
  Button,
  InputLabel,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ratingModalStyle } from "../../../utils/design";
import {
  createReview,
  fetchReviewbyProductId,
} from "../../../Redux/actions/reviewActions";
import { toast } from "react-toastify";

const RatingModal = ({ id }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const { user } = useSelector((state) => state.allUsers);
  const { firstName, lastName, imageUrl } = user;

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  const handleReview = async () => {
    const data = {
      rating: value,
      summary: labels[value],
      review: review,
      postedBy: firstName + " " + lastName,
      avatar: imageUrl,
      productId: id,
    };
    await dispatch(createReview(data));
    handleClose();
    setValue(0);
    setReview("");
    dispatch(fetchReviewbyProductId(id));
    toast.success("Review Submitted", {
      theme: "colored",
    });
  };

  return (
    <>
      <Button variant="contained" fontSize="small" onClick={handleOpen}>
        Write a Review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ratingModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              bgcolor: "#c4b6dc",
              p: 2,
            }}
          >
            Write a Review
          </Typography>
          <Box sx={{ p: 2 }}>
            <Typography
              id="modal-modal-description"
              sx={{ fontWeight: "bold" }}
            >
              How do you rate this product?
            </Typography>

            <Typography
              sx={{ width: "100%", color: "rgb(51 49 49 / 94%)", mt: 2 }}
            >
              Rating*
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 1 }} fontSize="inherit" />
                  }
                />

                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>

              <InputLabel sx={{ color: "rgb(51 49 49 / 94%)", mt: 2 }}>
                {" "}
                Review*{" "}
              </InputLabel>
              <TextField
                sx={{ width: "100%", mt: 1 }}
                id="filled-multiline-static"
                multiline
                rows={4}
                onChange={(e) => setReview(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: "#885cd3" }}
                onClick={handleReview}
              >
                {" "}
                Submit Review{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RatingModal;
