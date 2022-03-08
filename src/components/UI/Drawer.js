import {
  ExitToApp,
  HomeOutlined,
  PeopleOutlineOutlined,
  Person,
  PointOfSaleOutlined,
  ReceiptOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';

import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory, useLocation } from "react-router";

function DrawerBody(props) {

  const { eventClickMenu } = props

  const history = useHistory();
  const location = useLocation();
  const menuItemsTop = [
    {
      text: "Dashboard",
      icon: <HomeOutlined color="primary" />,
      path: "/dashboard",
    },
    {
      text: "Users",
      icon: <PeopleOutlineOutlined color="primary" />,
      // path: ["/dashboard/users/customers", "/dashboard/users/operators"],
      path: "/dashboard/users/customers",
    },
    {
      text: "Messages",
      icon: <ReceiptOutlined color="primary" />,
      path: "/dashboard/messages",
    },
    {
      text: "Transactions",
      icon: <ReceiptOutlined color="primary" />,
      path: "/dashboard/transactions",
    },
    // {
    //   text: "sales",
    //   icon: <PointOfSaleOutlined color="primary" />,
    //   path: "/dashboard/sales",
    // },
    // {
    //   text: "purchases",
    //   icon: <ShoppingCartOutlined color="primary" />,
    //   path: "/dashboard/purchases",
    // },
    {
      text: "Support",
      icon: <ContactSupportOutlinedIcon  color="primary" />,
      path: "/dashboard/support",
    },
  ];
  const menuItemsBottom = [
    {
      text: "My Perfil",
      icon: <Person color="primary" />,
      path: "/dashboard/settings",
    },
    {
      text: "Login",
      icon: <ExitToApp color="primary" />,
      path: "/login",
    },
  ];

  const onClickPath = (item) =>{
    history.push(item.path)
    eventClickMenu()
  }

  return (
    <>
      <Toolbar
        sx={{
          alignSelf: "center",
        }}
      >
        <Box>
          <Typography variant="h6" color="textSecondary">
            Panel
          </Typography>
        </Box>
      </Toolbar>

      <List sx={{ p: 2, pt: 0 }}>
        {menuItemsTop.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => onClickPath(item)}
            sx={{
              background:
                location.pathname === item.path ? "#e6a54326" : "#none",
              p: 2,
              borderRadius: "15px 15px 15px 15px",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>
              <Typography variant="body1">{item.text}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }}></Box>
      <List sx={{ p: 2, pt: 0 }}>
        {menuItemsBottom.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => onClickPath(item)}
            sx={{
              background:
                location.pathname === item.path ? "#e6a54326" : "#none",
              p: 2,
              borderRadius: "15px 15px 15px 15px",
            }}
          >
            <ListItemIcon>
              <Avatar sx={{ backgroundColor: "#eceff1" }}>{item.icon}</Avatar>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1">{item.text}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default DrawerBody;
