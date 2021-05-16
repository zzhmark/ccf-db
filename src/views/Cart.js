/*
用于检查收集的数据
*/

import React from "react";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";

import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";

import { saveAs } from "file-saver";
import { useStore } from "hooks";

// custom components
import FrameCollect from "components/Custom/Data/FrameCollect";

export default function Cart() {
  const store = useStore((state) => state.store);
  return store.size > 0 ? (
    <GridContainer>
      <GridItem xs={12} md={9}>
        <FrameCollect
          header={["Title", "Description", "Actions"]}
          body={Array.from(store)}
        />
      </GridItem>
      <GridItem xs={12} md={3}>
        <Card>
          <List>
            <ListItem
              button
              onClick={() => {
                Array.from(store).forEach((v) => {
                  const { title, orient, dataframe } = v[1];
                  let rows, colnames;
                  switch (orient) {
                    case "columns":
                      colnames = Object.keys(dataframe);
                      rows = Object.values(dataframe)
                        .map((series, i) =>
                          Object.values(series).map((v) => ({
                            [colnames[i]]: v
                          }))
                        )
                        .reduce((a, b) => a.map((v, i) => ({ ...v, ...b[i] })));
                      break;
                    default:
                      rows = dataframe;
                      colnames = Object.keys(Object.values(dataframe)[0]);
                  }
                  let blob = new Blob(
                    [
                      colnames.join("\t"),
                      "\n",
                      rows.map((v) => Object.values(v).join("\t")).join("\n")
                    ],
                    {
                      type: "text/plain;charset=utf-8"
                    }
                  );
                  saveAs(blob, title + ".txt");
                });
              }}
            >
              <ListItemIcon>
                <CloudDownloadOutlinedIcon />
              </ListItemIcon>
              <ListItemText />
              Download
            </ListItem>
          </List>
        </Card>
      </GridItem>
    </GridContainer>
  ) : (
    <GridContainer
      justify="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >
      <GridItem>
        <Typography variant="h2" style={{ color: "gray" }}>
          Your storage is empty
        </Typography>
      </GridItem>
    </GridContainer>
  );
}
