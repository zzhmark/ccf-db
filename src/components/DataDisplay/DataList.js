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
import DataControl from 'components/DataDisplay/DataControl'

import useData from "hooks/data";
import {
  Button,
  ExpansionPanelActions,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function DataList(props) {
  const classes = useStyles();
  // 这里的update作为样例只访问test，所以稍作修改
  const [data, update, del] = useData(
    (state) => [state.data, state.update, state.del],
    shallow
  );
  // 这里的数据是直接从object来的表格，所以用循环

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return Array.from(data.values(), (data, ind) => (
    <ExpansionPanel
      key={data.id}
      expanded={expanded === data.id}
      onChange={handleChange(data.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {data.name}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <DataControl {...data} update={update} />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button>Add to Cart</Button>
        <Button color="secondary" onClick={() => del(data.id)}>
          Delete
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  ));
}
