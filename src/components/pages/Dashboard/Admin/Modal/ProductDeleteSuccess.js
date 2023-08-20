import { CheckCircleOutline } from "@mui/icons-material";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../../Redux/actions";
import { modalStyle, successBtn } from "../../../../../utils/design";

const ProductDeleteSuccess = ({ product, close }) => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const handleOpenModal = () => setDeleteModal(true);
  const handleCloseModal = () => setDeleteModal(false);

  const handleDeleteproduct = async (id) => {
    dispatch(deleteProduct(id));
    handleOpenModal();
  };

  return (
    <>
      <Button sx={successBtn} onClick={() => handleDeleteproduct(product?._id)}>
        Yes
      </Button>
      <Modal
        hideBackdrop
        open={deleteModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton sx={{ color: "green" }}>
            <CheckCircleOutline fontSize="large" />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product has been deleted.
          </Typography>
          <Typography variant="caption" fontSize="14px">
            Record deleted Successfully
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{ display: "inline-block", mt: 2 }}
            onClick={() => {
              handleCloseModal();
              close();
            }}
          >
            {" "}
            OK{" "}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProductDeleteSuccess;
