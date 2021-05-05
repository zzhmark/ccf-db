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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { makeStyles } from "@material-ui/core/styles";
import FrameCollect from "components/Table/FrameCollect";
import { useStore } from "hooks";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import { saveAs } from "file-saver";

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
                  const { info, frame } = v[1];
                  let blob = new Blob(
                    [
                      frame["colnames"].join("\t"),
                      "\n",
                      frame["records"]
                        .map((v) => v.join("\t"))
                        .join("\n"),
                    ],
                    {
                      type: "text/plain;charset=utf-8",
                    }
                  );
                  saveAs(blob, info["records"][0][1] + ".txt");
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
