import {
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  modalStyle,
  smallAddBtn,
  smallAddIcon,
  successBtn,
} from "../../../../../utils/design";
import {
  createCategory,
  fetchCategories,
} from "../../../../../Redux/actions/categoryActions";

const AddCategory = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCategory(category));
    dispatch(fetchCategories());
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={smallAddBtn}
        onClick={handleOpen}
      >
        {" "}
        + Add{" "}
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={smallAddIcon}
        onClick={handleOpen}
      >
        {" "}
        +{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
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
            Add Category
          </Typography>

          <Box sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <InputLabel sx={{ color: "rgb(51 49 49 / 94%)" }}>
                Category Name*{" "}
              </InputLabel>
              <TextField
                sx={{ width: "100%", mt: 1 }}
                id="filled-static"
                size="small"
                required
                onChange={(e) => setCategory({ name: e.target.value })}
              />
              <InputLabel sx={{ color: "rgb(51 49 49 / 94%)", mt: 2 }}>
                {" "}
                Description{" "}
              </InputLabel>
              <TextField
                sx={{ width: "100%", mt: 1 }}
                id="filled-multiline-static"
                multiline
                rows={4}
                onChange={(e) => setCategory({ description: e.target.value })}
              />
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained" sx={successBtn}>
                  {" "}
                  Add{" "}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddCategory;
