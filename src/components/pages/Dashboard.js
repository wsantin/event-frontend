import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import Layout from "../layouts/Layout";
import AddReceipts from "../components/Receipts/AddReceipts";
import Dealers from "./Dealers";
import Home from "./Home";
import Receipts from "./Receipts";
import Settings from "./Settings";

function Dashboard(props) {
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route exact path={`${path}/settings`}>
          <Settings />
        </Route>
        <Route exact path={`${path}/dealers`}>
          <Dealers />
        </Route>
        <Route exact path={`${path}/messages`}>
          <Receipts />
        </Route>
        <Route exact path={`${path}/messages/add`}>
          <AddReceipts />
        </Route>
        <Route exact path={`${path}`}>
          <Home />
        </Route>
        <Redirect to={`${path}`} />
      </Switch>
    </Layout>
  );
}

export default Dashboard;
