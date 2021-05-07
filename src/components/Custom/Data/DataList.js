import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import shallow from "zustand/shallow";
import DataControl from "./DataControl";

import { useData, useStore } from "hooks";
import { Button, ExpansionPanelActions } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function DataList(props) {
  // 这里的update作为样例只访问test，所以稍作修改
  const [data, update, del] = useData(
    (state) => [state.data, state.update, state.del],
    shallow
  );
  const setStore = useStore((state) => state.set);
  // 这里的数据是直接从object来的表格，所以用循环

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const get_frame = async (id) => {
    // get unit
    let unit_res = await fetch("http://192.168.3.148:5000/get_unit?id=" + id, {
      method: "GET",
      mode: "cors",
    });
    let unit_json = await unit_res.json();
    const frame_id = unit_json["records"][0][2];
    // get frame
    let frame_res = await fetch("http://192.168.3.148:5000/get_frame?id=" + frame_id, {
      method: "GET",
      mode: "cors",
    });
    let frame_json = await frame_res.json();
    let frame_info_res = await fetch(
      "http://192.168.3.148:5000/get_frame_info?id=" + frame_id,
      {
        method: "GET",
        mode: "cors",
      }
    );
    let frame_info_json = await frame_info_res.json();
    setStore(frame_info_json['records'][0][0], {info: frame_info_json, frame: frame_json})
  };
  return Array.from(data.values(), (data, ind) => (
    <ExpansionPanel
      key={data.id}
      expanded={expanded === data.id}
      onChange={handleChange(data.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {data.title}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <DataControl {...data} update={update} />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button
          color="primary"
          onClick={() => {
            get_frame(data.id)
          }}
        >
          Add to cart
        </Button>
        <Button color="secondary" onClick={() => del(data.id)}>
          Delete
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  ));
}
