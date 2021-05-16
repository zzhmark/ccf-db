import React from "react";
// import Paper from "@material-ui/core/Paper";
// import Divider from "@material-ui/core/Divider/Divider";
import { Chart, Interaction, LineChart, Polygon, Tooltip } from "bizcharts";

function SubLineChart({ title, items }) {
  return (
    <LineChart
      data={items[0].data["PSTH"]}
      // title={{
      //   visible: true,
      //   text: "折线图",
      // }}
      // description={{
      //   visible: true,
      //   text: "用平滑的曲线代替折线。",
      // }}
      xField="timestamp"
      yField="strength"
      // interactions={[
      //   {
      //     type: "slider",
      //     cfg: {
      //       start: 0,
      //       end: 1,
      //     },
      //   },
      // ]}
    />
  );
}

export default function DataControl({
                                      id,
                                      chart,
                                      type,
                                      color,
                                      data,
                                      viewer,
                                      update,
                                      subChart
                                    }) {
  switch (type) {
    case "relation matrix":
      return (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
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
          <Chart {...chart} data={data} height={500} autoFit>
            <Tooltip>
              {(title, items) => {
                return <SubLineChart title={title} items={items} />;
              }}
            </Tooltip>
            <Polygon
              position={chart.mapping["x"] + "*" + chart.mapping["y"]}
              color={chart.color}
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            />
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
                          ["viewer", "color", data.data["row"]],
                          ["viewer", "load", data.data["row"]],
                          ["viewer", "visible", data.data["row"]]
                        ],
                        [
                          data.color,
                          true,
                          context.event.gEvent.target.cfg.element.hasState(
                            "selected"
                          )
                        ]
                      );
                    },
                    immediate: true
                  }
                ]
              }}
            />
          </Chart>
        </div>
      );
  }
}
