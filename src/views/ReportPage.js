import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import {
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useQuery } from "react-query";
import Dataframe from "components/Custom/Data/Dataframe";
import Button from "components/CustomButtons/Button";
import { useData, useSearch, useStore } from "hooks";
import { pushUnit, getCollection } from "utils";

export default function ReportPage() {
  const id = useSearch((state) => state.reportId);
  const setData = useData((state) => state.set);
  const setStore = useStore((state) => state.set);

  const { data, isLoading, error } = useQuery("collection_info", () =>
    getCollection(id)
  );
  if (id === null || isLoading || error)
    return (
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <GridItem>
          <Typography variant="h2" style={{ color: "gray" }}>
            {id === null
              ? "Take a collection to inspect"
              : isLoading
              ? "Loading..."
              : "ERROR"}
          </Typography>
        </GridItem>
      </GridContainer>
    );
  const { col_res, frame_res, lit_res, recipe_res, frame_info_res } = data;
  const [title, abstract] = col_res.data["records"][0].slice(4, 6);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} md={8}>
          <Typography variant="h4">{title}</Typography>
        </GridItem>
      </GridContainer>
      <Box margin="2rem" />
      <GridContainer>
        <GridItem xs={12} md={9}>
          <Card>
            <CardHeader color="primary">
              <Typography variant="h2">Abstract</Typography>
            </CardHeader>
            <CardBody>{abstract}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} md={9}>
          <Card>
            <CardHeader color="danger">
              <Typography variant="h2">Literatures</Typography>
            </CardHeader>
            <CardBody>
              {lit_res.map((v, i) => (
                <div key={i}>
                  <Typography variant="h5">{v.data.records[0][1]}</Typography>
                  <Divider />

                  <Typography variant="caption">
                    {v.data.records[0][2]}
                  </Typography>
                  <Typography variant="subtitle2">
                    {v.data.records[0][4]}
                  </Typography>
                  <Typography variant="body2">
                    {v.data.records[0][3]}
                  </Typography>
                  {v.data.records[0][5] && (
                    <Typography variant="body1">
                      PMID: {v.data.records[0][5]}
                    </Typography>
                  )}
                  {v.data.records[0][6] && (
                    <Typography variant="body1">
                      DOI: {v.data.records[0][6]}
                    </Typography>
                  )}
                </div>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} md={9}>
          <Card>
            <CardHeader color="info">
              <Typography variant="h2">Dataframes</Typography>
            </CardHeader>
            <CardBody>
              {frame_res.map((v, i) => (
                <div key={i}>
                  <Typography variant="h6">
                    {frame_info_res[i].data.records[0][1]}
                  </Typography>
                  <Typography variant="subtitle1">
                    {frame_info_res[i].data.records[0][2]}
                  </Typography>
                  {Dataframe(v.data)}
                  <List>
                    <ListItem>
                      <ListItemText />
                      <Button
                        color="primary"
                        onClick={() => {
                          setStore(frame_info_res[i].data.records[0][0], {
                            info: frame_info_res[i].data,
                            frame: v.data,
                          });
                        }}
                      >
                        Add to cart
                      </Button>
                    </ListItem>
                  </List>
                </div>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} md={9}>
          <Card>
            <CardHeader color="success">
              <Typography variant="h2">Visualization Recipes</Typography>
            </CardHeader>
            <CardBody>
              {recipe_res.map((v) => (
                <List>
                  <ListItem key={v.data.records[0][0]}>
                    <ListItemText
                      primary={v.data.records[0][2]}
                      secondary={v.data.records[0][3]}
                    />
                    <ListItemIcon>
                      <Button
                        color="info"
                        onClick={() => {
                          v.data.records[0][1].forEach((v) =>
                            pushUnit(v, setData)
                          );
                        }}
                      >
                        visualize
                      </Button>
                    </ListItemIcon>
                  </ListItem>
                </List>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
