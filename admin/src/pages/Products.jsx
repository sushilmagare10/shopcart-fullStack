import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../state/apiSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../components/Header";

const Products = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const items = useSelector((state) => state.product.products);
  console.log(items);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const rows = items.map((item) => ({
    _id: item._id,
    images: item.images[0],
    name: item.name,
    category: item.category,
    price: item.price,
    Stock: item.Stock,
  }));
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "images",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.images}
          alt={params.row.name}
          style={{ width: 50, height: 50, borderRadius: "50%" }} // Adjust the size as needed
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Title>{params.row.name}</Title>
        </Box>
      ),
    },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "Stock", headerName: "Stock", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={`/product/${params.row._id}`}>
            <Button>Edit</Button>
          </Link>
          <Delete onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </Delete>
        </>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subtitle="List of All Products" />
      <Box
        mt="40px"
        height="75vh"
        width="100%"
        display="flex"
        justifyContent="space-between"
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
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

const Title = styled("h2")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "17px",
  fontWeight: "600",
}));

const Button = styled("button")(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.alt,
  fontSize: "18px",
  fontWeight: "650",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  marginRight: "20px",
}));

const Delete = styled("div")(({ theme }) => ({
  color: "red",
  cursor: "pointer",
}));

export default Products;
