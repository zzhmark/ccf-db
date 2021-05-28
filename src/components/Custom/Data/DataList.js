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
import DataChart from "./Charts/DataChart";
import axios from "axios";
import { useData, useStore } from "hooks";
import {
  Button,
  Container,
  ExpansionPanelActions,
  Typography,
} from "@material-ui/core";

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
  return Array.from(data.values(), (data) => (
    <ExpansionPanel
      key={data.id}
      expanded={expanded === data.id}
      onChange={handleChange(data.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {data.title}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Container>
          <Typography variant="body2">{data.description}</Typography>
          <DataChart
            {...data}
            update={(fields, values) => update(data.id, fields, values)}
          />
        </Container>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button
          color="primary"
          onClick={async () => {
            const df_res = await axios.get(
              document.location.protocol +
                "//" +
                document.location.hostname +
                "/get_dataframe?oid=" +
                data["dataframe_id"]
            );
            setStore(df_res.data._id["$oid"], df_res.data);
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
