import {
  Box,
  Button,
  Modal,
  Popover,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteSuccess from "./Modal/OrderDeleteSuccess";
import { useState } from "react";
import { dangerBtn, modalStyle } from "../../../../utils/design";

const OrdersTable = ({ order, index, handlePayment, handleDelivery }) => {
  // Modal
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const close = () => setModal(false);

  const status =
    order?.deliveryStatus === "Shipped" && order?.paymentStatus === "Paid"
      ? "Completed"
      : order?.orderStatus;

  // Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <TableRow>
      <TableCell> {index + 1} </TableCell>
      <TableCell> {order._id} </TableCell>
      <TableCell> {order.name} </TableCell>
      <TableCell>
        {order?.products?.map((product) => (
          <Typography key={product?._id} sx={{ textTransform: "capitalize", fontSize: "12px" }}>
            {" "}
            {product.title}
          </Typography>
        ))}
      </TableCell>
      <TableCell> {order.createdAt} </TableCell>
      <TableCell> {order.amount} </TableCell>
      <TableCell> {order.paymentMethod} </TableCell>
      <TableCell>
        <Typography
          sx={{
            color: order?.paymentStatus === "Paid" ? "#45cb85" : "#3577f1",
            bgcolor:
              order?.paymentStatus === "Paid"
                ? "rgba(69,203,133,.23)"
                : "rgba(53,119,241,.23)",
            textTransform: "uppercase",
            fontSize: "11px",
            fontWeight: "bold",
            letterSpacing: "1px",
            padding: "5px 4px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {order?.paymentStatus}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            color:
              order?.deliveryStatus === "Shipped"
                ? "#45cb85"
                : order?.deliveryStatus === "Pending"
                ? "#3577f1"
                : order?.deliveryStatus === "Cancelled" && "#f06548",
            bgcolor:
              order?.deliveryStatus === "Shipped"
                ? "rgba(69,203,133,.23)"
                : order?.deliveryStatus === "Pending"
                ? "rgba(53,119,241,.23)"
                : "rgba(240,101,72,.23)",
            textTransform: "uppercase",
            fontSize: "11px",
            fontWeight: "bold",
            letterSpacing: "1px",
            padding: "5px 4px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {
            // order?.orderStatus === 'Cancelled' ? 'Cancelled' :
            order?.deliveryStatus
          }
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          sx={{
            color:
              status === "Completed"
                ? "#45cb85"
                : status === "Pending"
                ? "#3577f1"
                : "#f06548",
            bgcolor:
              status === "Completed"
                ? "rgba(69,203,133,.23)"
                : status === "Pending"
                ? "rgba(53,119,241,.23)"
                : "rgba(240,101,72,.23)",
            textTransform: "uppercase",
            fontSize: "11px",
            fontWeight: "bold",
            letterSpacing: "1px",
            padding: "5px 4px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {status}
        </Typography>
      </TableCell>
      <TableCell>
        <Button
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            bgcolor: open ? "#2a5fc1" : "rgba(53, 119, 241, 0.1)",
            color: open ? "white" : "#3577f1",
            p: 1,
            boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
            "&:hover": {
              bgcolor: "#2a5fc1",
              color: "white",
            },
          }}
        >
          ...
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".MuiPopover-paper": {
              boxShadow:
                "0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 3%), 0px 3px 14px 2px rgb(0 0 0 / 0%)",
            },
          }}
        >
          <Typography p={1}>
            <Button
              fontSize="small"
              sx={{ color: "#4b38b3", textTransform: "capitalize" }}
              disabled={order?.paymentStatus === "Paid"}
              onClick={() => handlePayment(order?._id)}
            >
              Mark as Paid
            </Button>

            <br />
            <Button
              fontSize="small"
              sx={{ color: "#4b38b3", textTransform: "capitalize" }}
              disabled={order?.deliveryStatus === "Shipped"}
              onClick={() => handleDelivery(order?._id)}
            >
              Mark as Shipped
            </Button>
            <br />

            <Button
              fontSize="small"
              sx={{ color: "#f06548", textTransform: "capitalize" }}
              disabled={order?.paymentStatus === "Paid"}
              onClick={handleOpen}
            >
              Delete
            </Button>
            <Modal
              open={modal}
              onClose={close}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this order?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    gap: "10px",
                  }}
                >
                  <DeleteSuccess close={close} order={order} />
                  <Button sx={dangerBtn} onClick={close}>
                    {" "}
                    No{" "}
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Typography>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default OrdersTable;
