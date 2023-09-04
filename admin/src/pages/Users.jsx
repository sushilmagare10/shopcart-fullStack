import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../state/apiSlice";

const Users = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  console.log(users);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers(dispatch);
    setIsLoading(false);
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Title>{params.row.name}</Title>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Users" subtitle="List of All Users" />
      <Box
        mt="40px"
        height="75vh"
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
          columns={columns}
          loading={isLoading || !users}
          getRowId={(row) => row.id}
          rows={rows}
        />
      </Box>
    </Box>
  );
};

export default Users;

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

const Title = styled("h2")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "17px",
  fontWeight: "600",
}));
