/*
本模块提供了选择脑区的treeview，请配合3D显示器一起使用
使用zustand存储模型的状态
*/
import React from "react";
import useModel from "helpers/model";

// 苹果按钮样式
import Switch from "components/IOSSwitch";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
import BrainTag from "./BrainTag";
import Muted from "components/Typography/Muted";

// treeview
import { TreeView, TreeItem } from "@material-ui/lab/";

const tree = require("assets/Mouse.json");

const OpenIcon = (props) => (
  <KeyboardArrowRightOutlinedIcon
    style={{
      width: "1rem",
      height: "1rem",
    }}
  ></KeyboardArrowRightOutlinedIcon>
);

const CloseIcon = (props) => (
  <KeyboardArrowDownOutlinedIcon
    style={{
      width: "1rem",
      height: "1rem",
    }}
  ></KeyboardArrowDownOutlinedIcon>
);

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
    marginRight: "1%",
  },
  group: {
    marginLeft: 7,
    paddingLeft: 9,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => <TreeItem {...props} />);

const useStyles = makeStyles({
  root: {
    height: "30vh",
    flexGrow: 1,
    width: "100%",
  },
});

function StackItems(props) {
  let subtree = [];
  const brains = useModel((state) => state.brains);
  const updateBrains = useModel((state) => state.update);
  for (let i in props.tree) {
    const id = props.tree[i].id;
    const brain = brains[id];
    subtree.push(
      <StyledTreeItem
        nodeId={id + ""}
        key={id}
        label={
          <div style={{ width: "100%", marginLeft: "0", display: "flex" }}>
            <span
              style={{
                marginTop: "auto",
                marginRight: "1rem",
                marginBottom: "auto",
              }}
            >
              <BrainTag name={props.tree[i].name} color={props.tree[i].color} />
            </span>
            <span
              style={{
                marginTop: "auto",
                marginRight: "auto",
                marginBottom: "auto",
              }}
            >
              <Muted>{props.tree[i].description}</Muted>
            </span>
            <span
              style={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              {brain === undefined ? (
                <IconButton
                  style={{ marginLeft: "auto" }}
                  aria-label="Download"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateBrains((state) => {
                      state.brains[id] = {
                        url: props.tree[i].url,
                        color: props.tree[i].color,
                        name: props.tree[i].name,
                        description: props.tree[i].description,
                        visible: true,
                      };
                    });
                  }}
                >
                  <GetAppIcon />
                </IconButton>
              ) : (
                <Switch
                  checked={brain.visible}
                  style={{ marginLeft: "auto" }}
                  onChange={() => {
                    updateBrains((state) => {
                      state.brains[id].visible = !brain.visible;
                    });
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              )}
            </span>
          </div>
        }
      >
        {props.tree[i].children.length > 0 ? (
          <div>
            <StackItems tree={props.tree[i].children} />
          </div>
        ) : (
          ""
        )}
      </StyledTreeItem>
    );
  }
  return subtree;
}

export default function BrainTreeView(props) {
  const classes = useStyles();
  return (
    <TreeView
      style={props.treeviewStyle}
      className={classes.root}
      defaultExpanded={[]}
      defaultCollapseIcon={<CloseIcon />}
      defaultExpandIcon={<OpenIcon />}
    >
      <StackItems tree={tree}></StackItems>
    </TreeView>
  );
}
