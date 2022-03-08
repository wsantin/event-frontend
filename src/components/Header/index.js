import { InputBase } from "@mui/material";
import { alpha, styled, Box} from "@mui/system";
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
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useSelector } from "react-redux";

import SearchBar from "../UI/SearchBar";
import { DRAWERWIDTH } from '../../constants/defaultValues'

const Header = (props) => {
  // const { setFilter } = useSelector(selectGlobalFilter);
  const handleAddClick = () =>{
    console.log("dfdf")
  }
  // const getToolBarContent = () => {
  //   const handleAddClick = () => {
  //     if (location.pathname === "/dashboard/receipts") {
  //       history.push("/dashboard/receipts/add");
  //     } else if (location.pathname === "/dashboard/dealers") {
  //       history.push("/dashboard/dealers/add");
  //     }
  //   };

  //   if (
  //     location.pathname === "/dashboard/users/customers" ||
  //     location.pathname === "/dashboard/users/operators" ||
  //     location.pathname === "/dashboard/messages"
  //   ) {
  //     return (
  //       <>
  //         <SearchBar />
  //         <Box sx={{ flexGrow: 1 }}></Box>
  //         <IconButton
  //           aria-label="notification"
  //           sx={{ mr: { sm: 2 } }}
  //           onClick={handleAddClick}
  //         >
  //           <Avatar sx={{ backgroundColor: "primary.main" }}>
  //             <Add color="#fff"></Add>
  //           </Avatar>
  //         </IconButton>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         {location.pathname === "/dashboard/receipts/add" ? (
  //           <Typography variant="h6" color="textSecondary">
  //             asasas
  //           </Typography>
  //         ) : (
  //           <></>
  //         )}
  //         <Box sx={{ flexGrow: 1 }}></Box>
  //         <IconButton aria-label="notification">
  //           <Notifications color="primary"></Notifications>
  //         </IconButton>
  //       </>
  //     );
  //   }
  // };

  return (
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
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          > 
            <Menu />
          </IconButton>
          {/* {getToolBarContent()} */}

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
        </Toolbar>
      </AppBar> 
  );
}

export default Header;
