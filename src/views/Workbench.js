/*
这个page作为工作台/workbench，负责核心的数据展示和操作功能
利用zustand保存状态
*/

import React from "react";

// @material-ui/icons
import DataUsageIcon from "@material-ui/icons/DataUsage";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocalOffer from "@material-ui/icons/LocalOffer";
import GamesIcon from "@material-ui/icons/Games";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import NavPills from "components/NavPills/NavPills.js";

// personal import
import BasicViewer from "components/Viewer/BasicViewer";
import BrainTreeView from "components/Brain/BrainTreeView";
import BrainList from "components/Brain/BrainList";
import BrainStacks from "components/Brain/BrainStacks";

import DataStacks from "components/DataDisplay/DataStacks";
import DataList from "components/DataDisplay/DataList";

export default function Workbench() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={8}>
        <Card>
          <BasicViewer
            canvasStyle={{
              height: "calc(min(80vw, 80vh))",
              backgroundColor: "#e6e6e3",
            }}
            cameraStyle={{
              far: 10000,
              position: [300, 300, -300],
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
                    height: "calc(min(80vw, 80vh) - 10rem)",
                  }}
                />
              ),
            },
            {
              thinPadding: true,
              tabButton: "Data",
              tabIcon: DataUsageIcon,
              tabContent: (
                <div
                  style={{
                    height: "calc(min(80vw, 80vh) - 9.1rem)",
                    padding: "0.5rem",
                  }}
                >
                  <DataList />
                </div>
              ),
            },
            {
              tabButton: "History",
              thinPadding: true,
              tabIcon: AccessTimeIcon,
              tabContent: <BrainList />,
            },
            {
              thinPadding: true,
              tabButton: "Control",
              tabIcon: GamesIcon,
              tabContent: <div></div>,
            },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
