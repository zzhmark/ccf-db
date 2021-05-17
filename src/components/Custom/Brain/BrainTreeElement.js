import React from "react";
import useBrains from "hooks/brains";
import shallow from "zustand/shallow";

// 苹果按钮样式
import Switch from "../IOSSwitch";
import { fade, withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";

import GetAppIcon from "@material-ui/icons/GetApp";
import BrainTag from "./BrainTag";
import Muted from "components/Typography/Muted";

// treeview
import { TreeItem } from "@material-ui/lab/";

import { get_brain_metadata } from "utils";
import { useQuery } from "react-query";

import ReactLoading from "react-loading";

import { atom, useAtom } from "jotai";

const treeItemOpenAtom = atom({ 997: false });
const setTreeItemOpenAtom = atom(null, (get, set, id) => {
  const temp = get(treeItemOpenAtom);
  const flag = temp[id] === undefined ? true : !temp[id];
  set(treeItemOpenAtom, {
    ...temp,
    [id]: flag,
  });
});

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

export default function BrainTreeStack({ children }) {
  const { data, isLoading, error } = useQuery(["treeNodes", children], () =>
    get_brain_metadata(children)
  );
  if (error) return null;
  if (isLoading)
    return (
      <Grid container justify="center">
        <ReactLoading type="bars" color="#666666" />
      </Grid>
    );

  return data.data.map((v, i) => (
    <BrainTreeItem node={v} key={i}>
      {v.children.length > 0 && <BrainTreeStack>{v.children}</BrainTreeStack>}
    </BrainTreeItem>
  ));
}

function BrainTreeItem({ node, children }) {
  const [open] = useAtom(treeItemOpenAtom);
  const [, togOpen] = useAtom(setTreeItemOpenAtom);
  const [brains, update, set] = useBrains(
    (state) => [state.brains, state.update, state.set],
    shallow
  );
  const toggleVisible = (id) =>
    update(id, ["visible"], !brains.get(id).visible);

  return (
    <StyledTreeItem
      TransitionProps={{ in: open[node.id] }}
      nodeId={node.id + ""}
      key={node.id}
      onIconClick={() => togOpen(node.id)}
      onLabelClick={() => togOpen(node.id)}
      label={
        <div style={{ width: "100%", marginLeft: "0", display: "flex" }}>
          <span
            style={{
              marginTop: "auto",
              marginRight: "1rem",
              marginBottom: "auto",
            }}
          >
            <BrainTag color={node.color}>{node.name}</BrainTag>
          </span>
          <span
            style={{
              marginTop: "auto",
              marginRight: "auto",
              marginBottom: "auto",
            }}
          >
            <Muted>{node.description}</Muted>
          </span>
          <span
            style={{
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {!brains.has(node.id) ? (
              <IconButton
                style={{ marginLeft: "auto" }}
                aria-label="Download"
                onClick={(e) => {
                  e.stopPropagation();
                  set(node.id, { ...node, visible: true });
                }}
              >
                <GetAppIcon />
              </IconButton>
            ) : (
              <Switch
                checked={brains.get(node.id).visible}
                style={{ marginLeft: "auto" }}
                onChange={() => {
                  toggleVisible(node.id);
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
      {children}
    </StyledTreeItem>
  );
}
