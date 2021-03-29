import React from "react";
import useControls from "hooks/controls";
import shallow from "zustand/shallow";

import Switch from "components/IOSSwitch";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default function Panel() {
  const [controls, setOit] = useControls(
    (state) => [state.controls, state.setOit],
    shallow
  );
  return (
    <List>
      <ListItem key="oit">
        <ListItemText primary="OIT" secondary="Order Independent Rendering" />
      </ListItem>
      <ListItemSecondaryAction>
        <Switch
          checked={controls.oit}
          style={{ marginLeft: "auto" }}
          onChange={() => {
            setOit(!controls.oit);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </ListItemSecondaryAction>
    </List>
  );
}
