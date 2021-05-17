import React from "react";
import { Chart, Interaction, LineChart, Polygon, Tooltip } from "bizcharts";

export default function HeatmapLine({
  chart,
  data,
  update,
  mapping,
  colormap,
  viewer,
}) {
  const { x, y, seq, score } = mapping;
  function SubLineChart({ items }) {
    const data = items[0].data;
    return (
      <>
        {/*<h4 style={{ marginLeft: "1rem", marginRight: "1rem" }}>*/}
        {/*  {data[y] + " - " + data[x]}*/}
        {/*</h4>*/}
        <LineChart
          data={data[seq].map((v, i) => ({
            timestamp: i,
            strength: v,
          }))}
          // title={{
          //   visible: true,
          //   text: data[y] + " - " + data[x],
          // }}
          xField="timestamp"
          yField="strength"
        />
      </>
    );
  }
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Chart {...chart} data={data} height={500} autoFit>
        <Tooltip>
          {(title, items) => {
            return <SubLineChart title={title} items={items} />;
          }}
        </Tooltip>
        <Polygon
          position={x + "*" + y}
          color={[score, colormap]}
          style={{
            lineWidth: 1,
            stroke: "#fff",
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
                  const data = context.event.data;
                  const i = data.data["_row"];
                  update(
                    [
                      ["viewer", "load", i],
                      ["viewer", "visible", i],
                    ],
                    [
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
