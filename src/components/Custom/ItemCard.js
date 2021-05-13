import React from "react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Muted from "components/Typography/Muted";
import {
  // Card,
  Button,
  CardMedia,
  Typography,
  CardActions,
  CardActionArea,
} from "@material-ui/core";

export default function ItemCard({
  title,
  content,
  handleEnter,
  img,
  handleStore,
  handleVis,
}) {
  return (
    <Card>
      <CardActionArea onClick={handleEnter}>
        <CardMedia
          component={img ? "img" : null}
          alt="example"
          image={img}
          title={title}
        />
        <CardHeader>
          <Typography variant="h5">{title}</Typography>
        </CardHeader>
        <CardBody>
          <Muted>
            {content.slice(0, 1000)}
            {content.length > 1000 && "......"}
          </Muted>
        </CardBody>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleStore}>
          Add all data to cart
        </Button>
        <Button size="small" color="secondary" onClick={handleVis}>
          Visualize all recipes
        </Button>
      </CardActions>
    </Card>
  );
}
