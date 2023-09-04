import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h3"
        color={theme.palette.secondary[700]}
        fontWeight="bold"
        sx={{ mb: "5px" }}>
        {title}
      </Typography>
      <Typography
        variant="h6"
        color={theme.palette.secondary.light}
        fontWeight="bold"
        sx={{ mb: "5px" }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
