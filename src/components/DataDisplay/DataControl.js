import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";
import ReactECharts from 'echarts-for-react';
import CardBody from 'components/Card/CardBody';
import Divider from '@material-ui/core/Divider/Divider'

export default function DataControl({ id, chart, type, mode, update, viewer }) {
    switch (type) {
      case "relation matrix":
        return (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* 基础显示控制 */}
            <CardBody>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(e, v) => {
                  update(id, ["mode"], v);
                }}
              >
                <ToggleButton value="ball">Ball</ToggleButton>
                <ToggleButton value="brain">Brain</ToggleButton>
              </ToggleButtonGroup>
            </CardBody>
            <Divider />
            {/* 内容显示控制 */}
            <Paper style={{ overflowX: "auto" }}>
                <ReactECharts option={chart} onEvents={
                    {
                        'click': (params) => {
                            // console.log(params)
                            const [i, j] = [params.data[1], params.data[0]]
                            update(id, ['viewer', 'visible', i, j], !viewer.visible[i][j])
                        },
                    }
                }/>
            </Paper>
          </div>
        );
    }
  };