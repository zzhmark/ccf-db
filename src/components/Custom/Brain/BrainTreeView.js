/*
本模块提供了选择脑区的treeview，请配合3D显示器一起使用
使用zustand存储模型的状态
*/
import React from "react";
import useBrains from "hooks/brains";
import shallow from "zustand/shallow";

// 苹果按钮样式
import Switch from "../IOSSwitch";
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
  const { parent, tree, brains, set, toggleVisible } = props;
  return tree.map((child, ind) => (
    <StyledTreeItem
      nodeId={child.id + ""}
      key={ind}
      label={
        <div style={{ width: "100%", marginLeft: "0", display: "flex" }}>
          <span
            style={{
              marginTop: "auto",
              marginRight: "1rem",
              marginBottom: "auto",
            }}
          >
            <BrainTag color={child.color}>{child.name}</BrainTag>
          </span>
          <span
            style={{
              marginTop: "auto",
              marginRight: "auto",
              marginBottom: "auto",
            }}
          >
            <Muted>{child.description}</Muted>
          </span>
          <span
            style={{
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {!brains.has(child.id) ? (
              <IconButton
                style={{ marginLeft: "auto" }}
                aria-label="Download"
                onClick={(e) => {
                  e.stopPropagation();
                  set(
                    child.id,
                    child,
                    parent,
                    child.children.map((child, ind) => child.id)
                  );
                }}
              >
                <GetAppIcon />
              </IconButton>
            ) : (
              <Switch
                checked={brains.get(child.id).visible}
                style={{ marginLeft: "auto" }}
                onChange={() => {
                  toggleVisible(child.id);
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
      {child.children.length > 0 ? (
        <div>
          <StackItems {...props} tree={child.children} />
        </div>
      ) : (
        ""
      )}
    </StyledTreeItem>
  ));
}

export default function BrainTreeView(props) {
  const classes = useStyles();
  const [brains, update, set] = useBrains(
    (state) => [state.brains, state.update, state.set],
    shallow
  );
  // 对append做一些小改动，目前tree是前端的asset，一个json，以后如果做成关系数据库，可能会修改成耦合度较低的形式
  // id作为唯一的标识，在treeview的构建中采用每个结点自己的ccf编号(但每个元素仍然保留了自己的id)
  // 为了补全树的信息，这里加入了parent和children的设计，可以从json算得，也可以做到数据库里面
  const set2 = (id, element, parent, children) =>
    set(id, {
      ...element,
      parent: parent,
      children: children,
      visible: true,
    });
  const toggleVisible = (id) =>
    update(id, ["visible"], !brains.get(id).visible);
  return (
    <TreeView
      style={props.treeviewStyle}
      className={classes.root}
      defaultExpanded={[]}
      defaultCollapseIcon={<CloseIcon />}
      defaultExpandIcon={<OpenIcon />}
    >
      <StackItems
        parent={-1}
        tree={tree}
        brains={brains}
        set={set2}
        toggleVisible={toggleVisible}
      ></StackItems>
    </TreeView>
  );
}
