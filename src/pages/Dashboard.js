import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";

import Layout from "../layouts/Layout";

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */'./Home' ));
const Message = React.lazy(() => import(/* webpackChunkName: "Message" */'./Message/pages' ));
const AddMessage = React.lazy(() => import(/* webpackChunkName: "Home" */'./Message/AddMessage' ));
const MessageDetail = React.lazy(() => import(/* webpackChunkName: "MessageDetail" */'./Message/pages/Detail' ));
const Transaction = React.lazy(() => import(/* webpackChunkName: "Transaction" */'./Transaction/pages' ));
const User = React.lazy(() => import(/* webpackChunkName: "User" */'./User/pages' ));
const UserManager = React.lazy(() => import(/* webpackChunkName: "UserManager" */'./User/pages/Manager' ));
const Settings = React.lazy(() => import(/* webpackChunkName: "Settings" */'./Settings' ));

const  Dashboard = (props) => {
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route exact path={`${path}`}  component={Home}/>
        <Route exact path={`${path}/users/:userType`} component={User}/>
        <Route exact path={`${path}/users/:userType/manager`} component={UserManager}/>
        <Route exact path={`${path}/messages`}  component={Message}/>
        <Route exact path={`${path}/messages/add`}  component={AddMessage}/>
        <Route exact path={`${path}/messages/:messageId/details`}  component={MessageDetail}/>
        <Route exact path={`${path}/transactions`}  component={Transaction}/>
        <Route exact path={`${path}/settings`} component={Settings}/>
        <Redirect to={`${path}`} />
      </Switch>
    </Layout>
  );
}

export default Dashboard;
