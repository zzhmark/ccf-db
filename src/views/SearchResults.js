/*
    该页面用于数据库搜索
*/

import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Container from "@material-ui/core/Container";
import CardFooter from "components/Card/CardFooter";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import SearchBar from "material-ui-search-bar";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import Typography from "@material-ui/core/Typography";
import Muted from "components/Typography/Muted.js";
import { useData, useStore } from "hooks";

export default function SearchResults() {
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
  return (
    <>
      <GridContainer>
        <GridItem>
          <SearchBar></SearchBar>
        </GridItem>
      </GridContainer>
      <Container>
        <GridContainer>
          <GridItem>
            <Card>
              <CardHeader color="warning">
                <Typography variant="h5">
                  Example: Functional connection from somatosensary cortex to
                  thalumus
                </Typography>
              </CardHeader>
              <CardBody>
                <Muted>
                  Neural activity in the cortical-thalamic-cortical circuits are
                  crucial for sensation, memory, decision and actions.
                  Nevertheless, a systematic characterization of
                  cortical-thalamic functional connectivity has not been
                  achieved. Here, we developed a high throughput method in awake
                  mice to systematically map functional connections from the
                  dorsal cortex to the thalamus, by combing
                  optogenetic-cortical-inhibition with single-neuron resolution
                  thalamic recording. Photoinhibition of the cortex resulted in
                  a rapid reduction of thalamic activity, revealing
                  topographically-organized corticothalamic excitatory inputs.
                  Cluster analysis showed that groups of neurons within
                  individual thalamic nuclei exhibited distinct dynamics. Their
                  cortical inputs expanded with time and the effects of
                  photoinhibition were modulated by behavioral states.
                  Furthermore, we found that individual thalamic neurons
                  received convergent inputs from widespread cortical regions.
                  Our results present a framework for collecting, analyzing, and
                  presenting large electrophysiological datasets with region
                  specific optogenetic perturbations and serve as a foundation
                  for further investigation of information processing in the
                  corticothalamic pathway.
                </Muted>
              </CardBody>
              <CardFooter>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => get_unit(1)}
                >
                  visualize
                </Button>
                <Button variant="contained" color="primary">
                  add to cart
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </Container>
    </>
  );
}
