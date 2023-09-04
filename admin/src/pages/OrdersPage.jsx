import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { adminRequest } from "../requestMethods";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";

const OrdersPage = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await adminRequest.get("/admin/orders");
        setOrders(res.data.orders);
      } catch (error) {
        console.log("Error getting orders ", error);
      }
    };
    getOrders();
  }, []);

  const handleDeliveryChange = async (orderId, newStatus) => {
    try {
      const response = await adminRequest.put(`/admin/order/${orderId}`, {
        delivery_status: newStatus,
      });
      // Handle success, update the orders state or re-fetch the orders
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const handlePaymentChange = async (orderId, Status) => {
    try {
      console.log("handlePaymentChange:", orderId, Status);
      const response = await adminRequest.put(`/admin/order/${orderId}`, {
        payment_status: Status,
      });
      // Handle success, update the orders state or re-fetch the orders
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const columns = [
    { field: "orderId", headerName: "Order ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    {
      field: "createdAt",
      headerName: "Order",
      type: "dateTime",
      flex: 1,
    },
    { field: "total", headerName: "Amount", flex: 1 },
    {
      field: "delivery_status",
      headerName: "Delivery",
      flex: 1,
      renderCell: (params) => (
        <Select
          onChange={(e) => handleDeliveryChange(params.row.id, e.target.value)}>
          <Option value="pending">Pending</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="delivered">Delivered</Option>
        </Select>
      ),
    },
    {
      field: "payment_status",
      headerName: "Payment",
      flex: 1,
      renderCell: (params) => (
        <Select
          onChange={(e) => handlePaymentChange(params.row.id, e.target.value)}>
          <PaymentOption value="pending">Pending</PaymentOption>
          <PaymentOption value="payed">Payed</PaymentOption>
        </Select>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    orderId: order._id,
    userId: order.userId,
    total: order.total,
    createdAt: new Date(order.createdAt), // Convert to Date object
    deliveryStatus: order.delivery_status,
    payment_status: order.payment_status,
  }));

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Recent Orders" />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <Box
          padding={5}
          height="100vh"
          width="100%"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              backgroundColor: theme.palette.background.alt,
            },

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[500],
              borderBottom: "none",
              fontSize: "20px",
            },
          }}>
          <DataGrid columns={columns} getRowId={(row) => row.id} rows={rows} />
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersPage;

const Select = styled("select")(({ theme }) => ({
  display: "flex",
  flexDirection: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  borderRadius: "5px",
  backgroundColor: theme.palette.background.alt,
  padding: "5px 10px",
}));
const Option = styled("option")(({ theme }) => ({
  display: "flex",
  flexDirection: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  marginTop: "8px",
  backgroundColor: theme.palette.background.alt,
  padding: "5px 10px",
}));

const PaymentOption = styled("option")(({ theme }) => ({
  display: "flex",
  flexDirection: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  marginTop: "8px",
  backgroundColor: theme.palette.background.alt,
  padding: "5px 10px",
}));
