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
import Workbench from "views/Workbench";
import DataMarket from "views/DataMarket";
import DataCart from "views/DataCart";
// import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import Search from "views/Search";

const dashboardRoutes = [
  {
    path: "/search",
    name: "Database Search",
    icon: SearchIcon,
    component: Search,
    layout: "/admin",
  },
  {
    path: "/market",
    name: "Data Browse",
    icon: LocalMallOutlinedIcon,
    component: DataMarket,
    layout: "/admin",
  },
  {
    path: "/cart",
    name: "Shopping Cart",
    icon: ShoppingCartIcon,
    component: DataCart,
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
