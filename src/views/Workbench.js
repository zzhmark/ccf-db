/*
这个page作为工作台/workbench，负责核心的数据展示和操作功能
利用zustand保存状态
*/

import React from "react";

// @material-ui/icons
import { AccessTime, DataUsage, Games, LocalOffer } from "@material-ui/icons";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";

// custom components
import NavPills from "components/Custom/NavPills";
import BasicViewer from "components/Custom/Viewer/BasicViewer";
import BrainTreeView from "components/Custom/Brain/BrainTreeView";
import BrainList from "components/Custom/Brain/BrainList";
import BrainStacks from "components/Custom/Brain/BrainStacks";

import DataStacks from "components/Custom/Data/DataStacks";
import DataList from "components/Custom/Data/DataList";
import Panel from "components/Custom/Panel";

export default function Workbench() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={8}>
        <Card>
          <BasicViewer
            canvasStyle={{
              height: "calc(min(80vw, 80vh))",
              backgroundColor: "#e6e6e3"
            }}
            cameraStyle={{
              far: 10000,
              position: [300, 300, 300]
            }}
          >
            <BrainStacks />
            <DataStacks />
          </BasicViewer>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
        <NavPills
          color="primary"
          tabs={[
            {
              tabButton: "Anatomy",
              tabIcon: LocalOffer,
              tabContent: (
                <BrainTreeView
                  treeviewStyle={{
                    height: "calc(min(80vw, 80vh) - 10rem)"
                  }}
                />
              )
            },
            {
              thinPadding: true,
              tabButton: "Data",
              tabIcon: DataUsage,
              tabContent: (
                <div
                  style={{
                    height: "calc(min(80vw, 80vh) - 9.1rem)",
                    padding: "0.5rem"
                  }}
                >
                  <DataList />
                </div>
              )
            },
            {
              tabButton: "History",
              thinPadding: true,
              tabIcon: AccessTime,
              tabContent: <BrainList />
            },
            {
              tabButton: "Control",
              tabIcon: Games,
              tabContent: <Panel />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
