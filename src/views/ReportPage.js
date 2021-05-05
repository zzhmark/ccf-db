import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Typography, Box, Divider } from "@material-ui/core";
import { useQuery } from "react-query";
import axios from "axios";
import Dataframe from "components/Table/Dataframe";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "components/CustomButtons/Button";
import { useData, useSearch, useStore } from "hooks";

async function get_collection(id) {
  const col_res = await axios.get(
    "http://192.168.3.148:5000/get_collection?id=" + id
  );
  const [
    collection_id,
    frame_id,
    literature_id,
    recipe_id,
    title,
    abstract,
  ] = col_res.data["records"][0];
  // frame
  const frame_res = await Promise.all(
    frame_id.map(
      async (v) =>
        await axios.get("http://192.168.3.148:5000/get_frame?id=" + v)
    )
  );

  const frame_info_res = await Promise.all(
    frame_id.map(
      async (v) =>
        await axios.get("http://192.168.3.148:5000/get_frame_info?id=" + v)
    )
  );

  // literature
  const lit_res = await Promise.all(
    literature_id.map(
      async (v) =>
        await axios.get("http://192.168.3.148:5000/get_literature?id=" + v)
    )
  );

  //recipe
  const recipe_res = await Promise.all(
    recipe_id.map(
      async (v) =>
        await axios.get("http://192.168.3.148:5000/get_recipe?id=" + v)
    )
  );

  return { col_res, frame_res, lit_res, recipe_res, frame_info_res };
}

export default function ReportPage() {
  const id = useSearch((state) => state.reportId);
  const setData = useData((state) => state.set);
  const setStore = useStore((state) => state.set);

  const get_unit = async (id) => {
    // get unit
    let unit_res = await fetch("http://192.168.3.148:5000/get_unit?id=" + id, {
      method: "GET",
      mode: "cors",
    });
    let unit_json = await unit_res.json();
    let [
      unit_id,
      strategy_id,
      frame_id,
      title,
      description,
      mapping,
      filter,
    ] = unit_json["records"][0];
    // get strategy
    let strategy_res = await fetch(
      "http://192.168.3.148:5000/get_strategy?id=" + strategy_id,
      {
        method: "GET",
        mode: "cors",
      }
    );
    let strategy_json = await strategy_res.json();
    // get frame
    let frame_res = await fetch(
      "http://192.168.3.148:5000/get_frame?id=" + frame_id,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const { mode } = strategy_json["records"][0][2][0];
    let frame_json = await frame_res.json();
    // processing frame
    let [a, b, c] = ["x", "y", "score"].map((v) =>
      frame_json["colnames"].indexOf(mapping[v]["colname"])
    );
    let datatable = frame_json["records"].map((v, i) => ({
      i: i,
      y: mapping["y"]["chart"][v[b]],
      x: mapping["x"]["chart"][v[a]],
      score: v[c],
      ...Object.fromEntries(
        filter.map((vv) => [
          vv["column"],
          v[frame_json["colnames"].indexOf(vv["column"])],
        ])
      ),
    }));
    // let datatable = []
    // for (let i in datatable1){
    //   if (datatable1[i]['window'] == '8-13ms') datatable.push(datatable1[i])
    // }
    setData(id, {
      id: id,
      type: "relation matrix",
      title: title,
      description: description,
      mode: mode,
      visible: true,
      chart: {
        color: ["score", "#BAE7FF-#1890FF-#0050B3"],
        filter: filter.map((v) => [
          v["column"],
          (x) => v["filter"].reduce((a, b) => a || b == x, true),
        ]),
        data: datatable,
        scale: {
          x: {
            values: Object.keys(mapping["x"]["chart"]),
            ...strategy_json["records"][0][1][0]["chart"]["scale"]["x"],
          },
          y: {
            values: Object.keys(mapping["y"]["chart"]),
            ...strategy_json["records"][0][1][0]["chart"]["scale"]["y"],
          },
        },
        ...strategy_json["records"][0][1]["chart"],
      },
      viewer: {
        visible: datatable.map(() => false),
        load: datatable.map(() => false),
        color: datatable.map(() => null),
        table: datatable,
        rowid: Object.values(mapping["y"]["view"]),
        colid: Object.values(mapping["x"]["view"]),
      },
    });
  };
  const { data, isLoading, error } = useQuery("collection_info", () =>
    get_collection(id)
  );
  if (isLoading || error) return null;
  const { col_res, frame_res, lit_res, recipe_res, frame_info_res } = data;
  const [
    collection_id,
    frame_id,
    literature_id,
    recipe_id,
    title,
    abstract,
  ] = col_res.data["records"][0];
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
                          v.data.records[0][1].forEach((v) => get_unit(v));
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
