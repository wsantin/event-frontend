import React, { Suspense } from 'react';
import { ThemeProvider } from "@emotion/react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory, createHashHistory } from 'history';
import { SnackbarProvider } from 'notistack';

// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import { type_route } from './constants/defaultValues';
import theme from "./theme";

const Dashboard = React.lazy(() => import(/* webpackChunkName: "Dashboard" */'./pages/Dashboard' ));
const Signin = React.lazy(() => import(/* webpackChunkName: "Signin" */'./pages/Auth/Signin' ));
const Signup = React.lazy(() => import(/* webpackChunkName: "Signup" */'./pages/Auth/Signup' ));
const SignupActivate = React.lazy(() => import(/* webpackChunkName: "SignupActivate" */'./pages/Auth/SignupActivate' ));
// const cacheRtl = createCache({
//   key: "muirtl",
//   // stylisPlugins: [rtlPlugin],
// });

const History = type_route === 'history' ? createBrowserHistory() : createHashHistory({ hashType: 'slash' });


function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Suspense fallback={<div className="loading" />}>
          <SnackbarProvider maxSnack={3}>
            <Router history={History}>
                {/* <CacheProvider value={cacheRtl}> */}
                  <Switch>
                    <Route exact path="/login" component={Signin} />
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/signup" component={Signup} />
                    <Route path="/activate" component={SignupActivate} />
                    <Redirect to="/login" />
                  </Switch>
                {/* </CacheProvider> */}
            </Router>
          </SnackbarProvider>
        </Suspense>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
