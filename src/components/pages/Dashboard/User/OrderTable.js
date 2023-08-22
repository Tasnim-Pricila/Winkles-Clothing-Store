import { Cancel } from "@mui/icons-material";
import {
  Button,
  Popover,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const OrderTable = ({ order, index, handleOrder }) => {
  const status =
    order?.deliveryStatus === "Shipped" && order?.paymentStatus === "Paid"
      ? "Completed"
      : order?.orderStatus;

  // Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
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
                  : "#f06548",
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
            {order?.deliveryStatus}
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
                size="small"
                sx={{ color: "#f06548", textTransform: "capitalize" }}
                endIcon={<Cancel />}
                disabled={
                  order?.paymentStatus === "Paid" ||
                  order?.orderStatus === "Cancelled"
                }
                onClick={() => handleOrder(order?._id)}
              >
                Cancel Order
              </Button>
            </Typography>
          </Popover>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderTable;
