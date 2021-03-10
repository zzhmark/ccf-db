/*
用于检查收集的数据
*/

import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Collapse,
  Container,
  Box,
  IconButton,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

let shoppingList = [
  { title: "lkaflk", content: "2019389014809184" },
  { title: "lk222", content: "2019389014809184" },
  { title: "lffffk", content: "2019389014809184" },
  { title: "bbbbbb", content: "2019389014809184" },
  { title: "keimimimim", content: "2019389014809184" },
  { title: "zzhjj", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
];

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function DataBrowse() {
  return <GridContainer></GridContainer>;
}
