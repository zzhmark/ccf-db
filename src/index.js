/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { enableMapSet } from "immer";
import { QueryClient, QueryClientProvider } from "react-query";

// core components
import Admin from "layouts/Admin";
// import Home from 'layouts/Home'
import "assets/css/material-dashboard-react.css?v=1.9.0";
const queryClient = new QueryClient();

const hist = createBrowserHistory();
enableMapSet();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        {/* <Route path="/home" component={Home} /> */}
        <Redirect from="/" to="/admin/home" />
      </Switch>
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
