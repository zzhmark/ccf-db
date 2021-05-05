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
// @material-ui/icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { SearchResults, Workbench, Cart, Home, ReportPage } from "views";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: HomeIcon,
    component: Home,
    layout: "/admin",
  },
  {
    path: "/search",
    name: "Search Results",
    icon: SearchIcon,
    component: SearchResults,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Data Report",
    icon: AssignmentRoundedIcon,
    component: ReportPage,
    layout: "/admin",
  },
  {
    path: "/storage",
    name: "My Storage",
    icon: ShoppingCartIcon,
    component: Cart,
    layout: "/admin",
  },
  {
    path: "/workbench",
    name: "3D Workbench",
    icon: LocationSearchingIcon,
    component: Workbench,
    layout: "/admin",
  },
];

export default dashboardRoutes;
