import {
  Search,
  Menu as MenuIcon,
  SettingsOutlined,
  LightModeOutlined,
  DarkModeOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { logout } from "../state/authSlice";

const { styled } = require("@mui/system");

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [settingsAnchor, setSettingsAnchor] = useState(null); // Add state for the settings popover anchor

  const openSettingsPopover = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const closeSettingsPopover = () => {
    setSettingsAnchor(null);
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <FlexBetween>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon />
        </IconButton>
        <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px"
          gap="3rem"
          p="0.1rem 1.5rem">
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>

      <FlexBetween gap="1.5rem">
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton onClick={openSettingsPopover}>
          <SettingsOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        <Popover
          open={Boolean(settingsAnchor)}
          anchorEl={settingsAnchor}
          onClose={closeSettingsPopover}>
          <List>
            {/* Add the logout option */}
            <ListItem onClick={logoutUser} sx={{ cursor: "pointer" }}>
              <ListItemIcon>
                <ExitToAppOutlined />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Popover>
      </FlexBetween>
    </Container>
  );
};

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "static",
  paddingTop: "2rem",
  paddingLeft: "1rem",
});

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default Navbar;
