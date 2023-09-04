import { Box, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 900px)");
  const isNonDesk = useMediaQuery("(max-width: 1280px)");

  const [isSidebarOpen, setIsSidebarOpen] = useState(!isNonDesk);

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    setIsSidebarOpen(!isNonDesk);
  }, [isNonDesk]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        isNonDesk={isNonDesk}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
