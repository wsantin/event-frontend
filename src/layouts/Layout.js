import React, { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { Box } from "@mui/system";
import {
  AppBar,
  Avatar,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Notifications, Menu, Add } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";

import DrawerBody from "../components/UI/Drawer";
import SearchBar from "../components/UI/SearchBar";

import { DRAWERWIDTH } from '../constants/defaultValues'

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const getToolBarContent = () => {
    const handleAddClick = () => {
      if (location.pathname === "/dashboard/users/customers") {
        history.push("/dashboard/users/customers/manager");
      } else if (location.pathname === "/dashboard/users/operators") {
        history.push("/dashboard/users/operators/manager");
      }
    };

    if (
      location.pathname === "/dashboard/users/customers" ||
      location.pathname === "/dashboard/users/operators" ||
      location.pathname === "/dashboard/messages"
    ) {
      return (
        <>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton
            aria-label="notification"
            sx={{ mr: { sm: 2 } }}
            onClick={handleAddClick}
          >
            <Avatar sx={{ backgroundColor: "primary.main" }}>
              <Add color="#fff"></Add>
            </Avatar>
          </IconButton>
        </>
      );
    } else {
      return (
        <>
          {location.pathname === "/dashboard/receipts/add" ? (
            <Typography variant="h6" color="textSecondary">
              asasas
            </Typography>
          ) : (
            <></>
          )}
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton aria-label="notification">
            <Notifications color="primary"></Notifications>
          </IconButton>
        </>
      );
    }
  };

  const eventClickMenu = useCallback( () =>{
    setMobileOpen(false)
  },[])

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        elevation={0}
        sx={{
          width: {
            md: `calc(100% - ${DRAWERWIDTH}px)`,
          },
          ml: { md: `${DRAWERWIDTH}px` },
        }}
      >
        <Toolbar component={Container} maxWidth="lg">
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          > 
            <Menu />
          </IconButton>
          {getToolBarContent()}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: DRAWERWIDTH }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          sx={{
            width: DRAWERWIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWERWIDTH,
              boxSizing: "border-box",
              // right: "unset",
              // left: 0,
            },

            display: { xs: "block", sm: "block", md: "none" },
          }}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          // edge="end"
          // anchor="right"
        >
          <DrawerBody eventClickMenu={eventClickMenu}/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWERWIDTH,
            },
          }}
          open
        >
          <DrawerBody eventClickMenu={eventClickMenu}/>
        </Drawer>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Toolbar></Toolbar>
        {/* <Container maxWidth="lg">{children}</Container> */}
        <Container style={{maxWidth:'1300px'}}>{children}</Container>
      </Box>
    </Box>
  );
}

export default Layout;
