import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import Dataframe from "components/Custom/Data/Tables/Dataframe";
import Button from "components/CustomButtons/Button";
import { useData, useSearch, useStore } from "hooks";
import { get_collection, get_ingredient } from "utils";
import { Title } from "@material-ui/icons";
import ReactLoading from "react-loading";

export default function ReportPage() {
  const id = useSearch((state) => state.reportId);
  if (id === null)
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <GridItem>
          <Typography variant="h2" style={{ color: "gray" }}>
            Take a collection to inspect
          </Typography>
        </GridItem>
      </Grid>
    );
  else return ReportPageContent(id);
}

function ReportPageContent(id) {
  const addData = useData((state) => state.addData);
  const setStore = useStore((state) => state.set);
  const { data, isLoading, error } = useQuery("collection_info", () =>
    get_collection(id)
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
            {isLoading ? (
              <Grid container justify="center">
                <ReactLoading type="bars" color="#666666" />
              </Grid>
            ) : (
              "ERROR"
            )}
          </Typography>
        </GridItem>
      </GridContainer>
    );
  const { col_res, df_res, ref_res, recipe_res } = data;
  const { title, description } = col_res.data;

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
              <Typography variant="h2">Description</Typography>
            </CardHeader>
            <CardBody>{description}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} md={9}>
          <Card>
            <CardHeader color="danger">
              <Typography variant="h2">References</Typography>
            </CardHeader>
            <CardBody>
              {ref_res.map((v, i) => {
                const { title, abstract, publish_date, authors, PMID, DOI } =
                  v.data;
                const date_parse = new Date(publish_date["$date"]);
                return (
                  <div key={i}>
                    <Typography variant="h5">{title}</Typography>
                    <Divider />
                    <Typography variant="caption">
                      {authors.join(", ")}
                    </Typography>
                    <Typography variant="subtitle2">
                      {date_parse.toISOString().split("T")[0]}
                    </Typography>
                    <Typography variant="body2">{abstract}</Typography>
                    {PMID && (
                      <Typography variant="body1">PMID: {PMID}</Typography>
                    )}
                    {DOI && <Typography variant="body1">DOI: {DOI}</Typography>}
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} md={9}>
          <Card>
            <CardHeader color="info">
              <Typography variant="h2">Associated Data</Typography>
            </CardHeader>
            <CardBody>
              {df_res.map((v, i) => {
                const { title, description, dataframe, _id, orient } = v.data;
                return (
                  <div key={i}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1">{description}</Typography>
                    {Dataframe({ dataframe, orient })}
                    <List>
                      <ListItem>
                        <ListItemText />
                        <Button
                          color="primary"
                          onClick={() => {
                            setStore(_id["$oid"], v.data);
                          }}
                        >
                          Add to cart
                        </Button>
                      </ListItem>
                    </List>
                  </div>
                );
              })}
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
              {recipe_res.map((v, i) => {
                const { title, description } = v.data;
                return (
                  <List key={i}>
                    <ListItem key={Title}>
                      <ListItemText primary={title} secondary={description} />
                      <ListItemIcon>
                        <Button
                          color="info"
                          onClick={() => {
                            v.data["ingredient_id"].forEach(async (v) => {
                              const id = v["$oid"];
                              const { ingredient, dataframe } =
                                await get_ingredient(id);
                              addData(id, ingredient, dataframe);
                            });
                          }}
                        >
                          visualize
                        </Button>
                      </ListItemIcon>
                    </ListItem>
                  </List>
                );
              })}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
