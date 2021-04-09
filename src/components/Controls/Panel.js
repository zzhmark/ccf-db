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
  const [controls, setOit, setGrid, setAxis, setBackground] = useControls(
    (state) => [state.controls, state.setOit, state.setGrid, state.setAxis, state.setBackground],
    shallow
  );
  const [ax, setAx] = React.useState(() => {
    let t = [];
    if (controls.axis[0]) t.push("x");
    if (controls.axis[1]) t.push("y");
    if (controls.axis[2]) t.push("z");
    return t;
  });
  return (
    <List>
      <ListItem key="oit">
        <ListItemText primary="OIT" secondary="Order Independent Rendering" />
        <ListItemIcon>
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
        </ListItemIcon>
      </ListItem>
      <ListItem key="grid">
        <ListItemText primary="Grid" secondary="toggle 2D grid" />
        <ListItemIcon>
          <Switch
            checked={controls.grid}
            style={{ marginLeft: "auto" }}
            onChange={() => {
              setGrid(!controls.grid);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </ListItemIcon>
      </ListItem>
      <ListItem key="axis">
        <ListItemText primary="Axis" secondary="toggle X, Y, Z axis" />
        <ListItemIcon>
          <ToggleButtonGroup
            value={ax}
            onChange={(e, v) => {
              setAx(v);
              setAxis(0, v.includes('x'));
              setAxis(1, v.includes('y'));
              setAxis(2, v.includes('z'));
            }}
          >
            <ToggleButton value="x">X</ToggleButton>
            <ToggleButton value="y">Y</ToggleButton>
            <ToggleButton value="z">Z</ToggleButton>
          </ToggleButtonGroup>
        </ListItemIcon>
      </ListItem>
      <ListItem key="background">
        <ListItemText primary="Background" secondary="toggle background" />
        <ListItemIcon>
          <Switch
            checked={controls.background}
            style={{ marginLeft: "auto" }}
            onChange={() => {
              setBackground(!controls.background);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </ListItemIcon>
      </ListItem>
    </List>
  );
}
