/*
    该页面用于数据库搜索
*/

import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardFooter from "components/Card/CardFooter";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import SearchBar from "material-ui-search-bar";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import { List, ListItem,Typography } from "@material-ui/core";
import Muted from "components/Typography/Muted.js";
import { useData, useStore } from "hooks";
import { pushUnit } from "utils";
import ChipsArray from "components/Custom/ChipsArray";
import ItemCard from "components/Custom/ItemCard";
import FilterCard from "components/Custom/FilterCard";

export default function SearchResults() {
  const setData = useData((state) => state.set);
  const setStore = useStore((state) => state.set);

  return (
    <GridContainer justify="space-between">
      <GridContainer item xs={12} sm={4} lg={3} justify="center">
        <GridItem xs={12} xl={10}>
          <FilterCard title={"Filter"} content={"TODO"}></FilterCard>
        </GridItem>
      </GridContainer>
      <GridItem xs={12} sm={8} lg={9}>
        <GridContainer item xs={12} justify="center">
          <GridItem xs={12}>
            <List style={{ width: "100%" }}>
              <ListItem />
              <ListItem>
                <SearchBar style={{ width: "100%" }} />
              </ListItem>
              <ListItem>
                <ChipsArray />
              </ListItem>
            </List>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} lg={6} xl={4}>
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
                  onClick={() => pushUnit(1, setData)}
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
      </GridItem>
    </GridContainer>
  );
}
