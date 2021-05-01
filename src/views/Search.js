/*
    该页面用于数据库搜索
*/

import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Container from "@material-ui/core/Container";
import SearchBar from "material-ui-search-bar";
import Button from "@material-ui/core/Button";

import shallow from "zustand/shallow";
import useData from "hooks/data";

export default function DataBrowse() {
  const [data, update, set] = useData(
    (state) => [state.data, state.update, state.set],
    shallow
  );

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
    const { mode } = strategy_json['records'][0][2][0]
    let frame_json = await frame_res.json();
    // processing frame
    let [a, b, c] = ["x", "y", "score"].map((v) =>
      frame_json["colnames"].indexOf(mapping[v]['colname'])
    );
    let datatable = frame_json["records"].map((v, i) => ({
      i: i,
      y: mapping["y"]["chart"][v[b]],
      x: mapping["x"]["chart"][v[a]],
      score: v[c],
    }));
    set(id, {
      id: id,
      type: 'relation matrix',
      title: title,
      description: description,
      mode: mode,
      visible: true,
      chart: {
        data: datatable,
        scale: {
          x: {
            values: Object.keys(mapping["x"]["chart"]),
            ...strategy_json["records"][0][1][0]["chart"]['scale']['x'],
          },
          y: {
            values: Object.keys(mapping["y"]["chart"]),
            ...strategy_json["records"][0][1][0]["chart"]['scale']['y'],
          },
        },
        ...strategy_json["records"][0][1]["chart"],
      },
      viewer: {
        visible: datatable.map(() => false),
        table: datatable,
        rowid: Object.values(mapping["y"]["view"]),
        colid: Object.values(mapping["x"]["view"]),
      },
    });
  };
  return (
    <GridContainer>
      <GridItem>
        <SearchBar></SearchBar>
      </GridItem>
      <GridItem>
        <Button onClick={() => get_unit(1)}>test</Button>
      </GridItem>
    </GridContainer>
  );
}
