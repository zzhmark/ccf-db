import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
// import Paper from "@material-ui/core/Paper";
import CardBody from "components/Card/CardBody";
// import Divider from "@material-ui/core/Divider/Divider";

import {
  Chart,
  Area,
  Line,
  Point,
  Tooltip,
  Axis,
  View,
  Label,
  Interaction,
  Polygon,
} from "bizcharts";

import { LineChart } from "bizcharts";

// 数据源
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

function Demo() {
  return (
    <LineChart
      data={data}
      title={{
        visible: true,
        text: "折线图",
      }}
      description={{
        visible: true,
        text: "用平滑的曲线代替折线。",
      }}
      xField="year"
      yField="value"
      interactions={[
        {
          type: "slider",
          cfg: {
            start: 0,
            end: 1,
          },
        },
      ]}
    />
  );
}

export default function DataControl({ id, chart, type, mode, update }) {
  switch (type) {
    case "relation matrix":
      return (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* 基础显示控制 */}
          {/* <CardBody>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(e, v) => {
                update(id, ["mode"], v);
              }}
            >
              <ToggleButton value="bone">bone</ToggleButton>
              <ToggleButton value="brain">brain</ToggleButton>
            </ToggleButtonGroup>
          </CardBody> */}
          <Chart
            scale={chart.scale}
            height={500}
            data={chart.data}
            filter={chart.filter}
            autoFit
          >
            <Axis
              name={"x"}
              title={null}
              grid={{
                alignTick: false,
                line: {
                  style: {
                    lineWidth: 1,
                    lineDash: null,
                    stroke: "#f0f0f0",
                  },
                },
              }}
            />
            <Axis
              name={"y"}
              title={null}
              grid={{
                alignTick: false,
                line: {
                  style: {
                    lineWidth: 1,
                    lineDash: null,
                    stroke: "#f0f0f0",
                  },
                },
              }}
            />
            <Tooltip>
              {(title, items) => {
                return <Demo />;
              }}
            </Tooltip>
            <Polygon
              position={"x*y"}
              color={chart.color}
              style={{
                lineWidth: 1,
                stroke: "#fff",
              }}
            ></Polygon>
            <Interaction
              type={"element-selected"}
              config={{
                start: [
                  {
                    trigger: "element:click",
                    action: "element-selected:toggle",
                    callback(context) {
                      let data = context.event.data;
                      update(
                        id,
                        [
                          ["viewer", "color", data.data["i"]],
                          ["viewer", "load", data.data["i"]],
                          ["viewer", "visible", data.data["i"]],
                        ],
                        [
                          data.color,
                          true,
                          context.event.gEvent.target.cfg.element.hasState(
                            "selected"
                          ),
                        ]
                      );
                    },
                    immediate: true,
                  },
                ],
              }}
            />
          </Chart>
        </div>
      );
  }
}
