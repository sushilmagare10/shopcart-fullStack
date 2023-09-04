import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Widgets from "../components/Widgets";
import Chart from "../components/Chart";
import { adminRequest } from "../requestMethods";
import { getUsers } from "../state/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1200px)");
  const [userStats, setUserStats] = useState([]);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers(dispatch);
    setIsLoading(false);
  }, [dispatch]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await adminRequest.get("/admin/users/stats");
        const newData = new Array(12).fill(0); // Initialize an array with 12 zeros

        // Map the API data to the correct position in the newData array
        res.data.data.forEach((item) => {
          newData[item._id - 1] = item.total;
        });

        const userStatsData = MONTHS.map((month, index) => ({
          name: month,
          "New User": newData[index],
        }));

        setUserStats(userStatsData);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };
    getStats();
  }, [MONTHS]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Title>{params.row.name}</Title>
        </Box>
      ),
    },
    { field: "email", headerName: "Email", flex: 0.8 },
    { field: "role", headerName: "Role", flex: 0.8 },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DashBoard" subtitle="Welcome to your Dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.accentColor.teal,
              color: theme.palette.grey.dark,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 40px",
            }}>
            Download
            <DownloadOutlinedIcon sx={{ ml: "10px" }} />
          </Button>
        </Box>
      </Box>

      <Box display="flex">
        <Widgets />
      </Box>
      {/* grid */}
      <Box
        mr={5}
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
        }}>
        <Box
          ml={3.3}
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          p="10px">
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="New User"
          />
        </Box>

        <Box
          ml={3.3}
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          p="8px"
          height="55vh">
          <Box
            mt="40px"
            padding={5}
            height="50vh"
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
      </Box>
    </Box>
  );
};

export default Dashboard;

const Title = styled("h2")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "17px",
  fontWeight: "600",
}));
