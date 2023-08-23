import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import OrderTable from "./OrderTable";
import { useEffect } from "react";
import Loading from "../../Loading/Loading";
import { getMe } from "../../../../Redux/actions/userActions";
import {
  getOrdersByEmail,
  updateorder,
} from "../../../../Redux/actions/orderActions";

const MyOrders = () => {
  const user = useSelector((state) => state.allUsers.user);
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.allProducts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersByEmail(user?.email));
  }, [dispatch, user?.email]);

  const handleOrder = async (id) => {
    await dispatch(
      updateorder(id, {
        orderStatus: "Cancelled",
      })
    );
    dispatch(getMe());
  };

  return (
    <>
      <Box mb={4}>
        <Toolbar
          sx={{
            boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#495057",
          }}
        >
          My Orders
        </Toolbar>
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Card
                variant="outlined"
                sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)" }}
              >
                <Divider />
                {loading ? (
                  <Loading />
                ) : (
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead sx={{ bgcolor: "#f3f6f9" }}>
                        <TableRow
                          sx={{
                            ".MuiTableCell-root": {
                              color: "#878a99",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          <TableCell> # </TableCell>
                          <TableCell> Order ID </TableCell>
                          <TableCell> Customer </TableCell>
                          <TableCell> Product </TableCell>
                          <TableCell> Order Date </TableCell>
                          <TableCell> Amount </TableCell>
                          <TableCell> Payment Method </TableCell>
                          <TableCell> Payment Status </TableCell>
                          <TableCell> Delivery Status </TableCell>
                          <TableCell> Order Status </TableCell>
                          <TableCell> Action </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody
                        sx={{
                          ".MuiTableCell-body": {
                            color: "#212529",
                          },
                        }}
                      >
                        {orders?.map((order, index) => (
                          <OrderTable
                            key={order?._id}
                            order={order}
                            index={index}
                            handleOrder={handleOrder}
                          ></OrderTable>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MyOrders;
