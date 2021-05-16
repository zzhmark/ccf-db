import React from "react";

// hooks
import { useControls } from "hooks";
import shallow from "zustand/shallow";

// material ui components
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

// custom components
import Slider from "components/Custom/IOSSlider";
import Switch from "components/Custom/IOSSwitch";

export default function Panel() {
  const [
    controls,
    setOit,
    setGrid,
    setAxis,
    setBackground,
    setSliceX,
    setSliceY,
    setSliceZ,
    setSlicing,
  ] = useControls(
    (state) => [
      state.controls,
      state.setOit,
      state.setGrid,
      state.setAxis,
      state.setBackground,
      state.setSliceX,
      state.setSliceY,
      state.setSliceZ,
      state.setSlicing,
    ],
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
            onChange={(event, value) => {
              setOit(value);
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
            onChange={(event, value) => {
              setGrid(value);
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
              setAxis(0, v.includes("x"));
              setAxis(1, v.includes("y"));
              setAxis(2, v.includes("z"));
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
            onChange={(event, value) => {
              setBackground(value);
            }}
          />
        </ListItemIcon>
      </ListItem>
      <ListItem key="slicing">
        <ListItemText primary="Slicing" secondary="enabling 2D slicing" />
        <Switch
          checked={controls.slicing}
          style={{ marginLeft: "auto" }}
          onChange={(event, value) => {
            setSlicing(value);
          }}
        />
      </ListItem>
      <Collapse in={controls.slicing} timeout="auto" unmountOnExit>
        <ListItem key="sliceX">
          <ListItemIcon>
            <Switch
              checked={controls.sliceX.visible}
              style={{ margin: "auto" }}
              onChange={(event, flag) => {
                setSliceX(flag, controls.sliceX.value);
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Slice X"
            secondary="slicing control for x direction"
          />
          <ListItemIcon style={{ width: "50%" }}>
            <Slider
              valueLabelDisplay="auto"
              disabled={!controls.sliceX.visible}
              min={0}
              max={131}
              value={controls.sliceX.value}
              onChange={(event, value) => {
                setSliceX(controls.sliceX.visible, value);
              }}
            />
          </ListItemIcon>
        </ListItem>
        <ListItem key="sliceY">
          <ListItemIcon>
            <Switch
              checked={controls.sliceY.visible}
              style={{ margin: "auto" }}
              onChange={(event, flag) => {
                setSliceY(flag, controls.sliceY.value);
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Slice Y"
            secondary="slicing control for y direction"
          />
          <ListItemIcon style={{ width: "50%" }}>
            <Slider
              valueLabelDisplay="auto"
              disabled={!controls.sliceY.visible}
              min={0}
              max={79}
              value={controls.sliceY.value}
              onChange={(event, value) => {
                setSliceY(controls.sliceY.visible, value);
              }}
            />
          </ListItemIcon>
        </ListItem>
        <ListItem key="sliceZ">
          <ListItemIcon>
            <Switch
              checked={controls.sliceZ.visible}
              style={{ margin: "auto" }}
              onChange={(event, flag) => {
                setSliceZ(flag, controls.sliceZ.value);
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Slice Z"
            secondary="slicing control for z direction"
          />
          <ListItemIcon style={{ width: "50%" }}>
            <Slider
              valueLabelDisplay="auto"
              disabled={!controls.sliceZ.visible}
              min={0}
              max={113}
              value={controls.sliceZ.value}
              onChange={(event, value) => {
                setSliceZ(controls.sliceZ.visible, value);
              }}
            />
          </ListItemIcon>
        </ListItem>
      </Collapse>
    </List>
  );
}
