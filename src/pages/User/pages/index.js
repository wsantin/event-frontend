import { Home } from "@mui/icons-material";
import { Box } from "@mui/system";
import React, { useEffect, useState} from "react";
import { useParams, useHistory } from "react-router";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import UserTable from "../component/UserTable";
import CustomBreadcrumbs from "../../../components/UI/CustomBreadcrumbs";

const UserBreadcurmbs = () => {
  const history = useHistory();

  const nextPage = (next) => history.push(next);
  const navs = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Home fontSize="small" />,
    },
  ];
  return (
    <CustomBreadcrumbs
      nextPage={nextPage}
      navs={navs}
      activePage={{ name:"User" }}
    />
  );
};

function User(props) {

  const { userType } = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");

  const handlerRedirect = (event, newValue) => {
    history.push({
      pathname: newValue
    });
  };

  useEffect(async () => {
    if (userType === "customers") {
      setActiveTab("customers");
    } else if (userType === "operators") {
      setActiveTab("operators");
    } else {
      history.push({
        pathname: '/dashboard'
      });
    }
  }, []);

  return (
    <Box>
      <UserBreadcurmbs />
      <Tabs
        value={userType}
        onChange={handlerRedirect}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="customers" label="Customers" />
        <Tab value="operators" label="Operators" />
      </Tabs>

      {userType&&activeTab === "customers" && (
        // <CardBody>
          // <ClienteComponente />
        // </CardBody>
        <UserTable userType={userType}/>
        )}

      {userType&&activeTab === "operators" && (
        <UserTable userType={userType}/>
      )}
      
    </Box>
  );
}

export default User;
