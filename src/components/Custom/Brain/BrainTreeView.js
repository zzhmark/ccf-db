import React from "react";

// 苹果按钮样式
import { makeStyles } from "@material-ui/core/styles";

import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";

// treeview
import { TreeView } from "@material-ui/lab/";
import BrainTreeStack from "./BrainTreeElement";

// styles
const OpenIcon = () => (
  <KeyboardArrowRightOutlinedIcon
    style={{
      width: "1rem",
      height: "1rem"
    }}
  ></KeyboardArrowRightOutlinedIcon>
);

const CloseIcon = () => (
  <KeyboardArrowDownOutlinedIcon
    style={{
      width: "1rem",
      height: "1rem"
    }}
  ></KeyboardArrowDownOutlinedIcon>
);

const useStyles = makeStyles({
  root: {
    height: "30vh",
    flexGrow: 1,
    width: "100%"
  }
});

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
      <BrainTreeStack>{[997]}</BrainTreeStack>
    </TreeView>
  );
}
