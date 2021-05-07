import React from "react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardAvatar from "components/Card/CardAvatar";
import Muted from "components/Typography/Muted";

import styles from "assets/jss/material-dashboard-react/cardImagesStyles";
import {
  cardTitle,
  cardSubtitle,
  cardLink,
} from "assets/jss/material-dashboard-react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(styles);
const useTextStyles = makeStyles({
  cardTitle,
  cardSubtitle,
  cardLink,
});

export default function ItemCard(props) {
  const classes = useStyles();
  const textClasses = useTextStyles();
  const { title, content } = props;
  return (
    <Card>
      <CardHeader color="info">
        <h3>{title}</h3>
      </CardHeader>
      <CardBody>
        <p>{content}</p>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
