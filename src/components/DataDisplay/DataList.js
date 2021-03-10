import React from "react";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// @material-ui/icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Close from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Muted from "components/Typography/Muted";
import shallow from "zustand/shallow";

import useData from "hooks/data";
import { Button, ExpansionPanelActions, Divider } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(styles);

export default function DataList(props) {
  const classes = useStyles();
  // 这里的update作为样例只访问test，所以稍作修改
  const [data, update, del] = useData(
    (state) => [state.data, state.update, state.del],
    shallow
  );
  const { rtlActive } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive,
  });
  // 这里的数据是直接从object来的表格，所以用循环

  const dataItem = (id, name, visible, toggle) => (
    <TableRow key={id} className={classes.tableRow} hover>
      <TableCell className={tableCellClasses} align="left">
        <Muted>{name}</Muted>
      </TableCell>
      <TableCell
        className={tableCellClasses}
        align="right"
        style={{
          paddingRight: "1rem",
        }}
      >
        <Checkbox
          color="primary"
          checked={visible}
          tabIndex={-1}
          onChange={(e) => {
            e.stopPropagation();
            toggle();
          }}
          checkedIcon={<VisibilityIcon />}
          icon={<VisibilityOutlinedIcon />}
        />
      </TableCell>
    </TableRow>
  );

  const dataParse = ({ id, data, type, mode }) => {
    switch (type) {
      case "relation matrix":
        return (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardBody>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(e, v) => {
                  update(id, ["mode"], v);
                }}
              >
                <ToggleButton value="ball">Ball</ToggleButton>
                <ToggleButton value="brain">Brain</ToggleButton>
              </ToggleButtonGroup>
            </CardBody>
            <Divider />
            <Table className={classes.table}>
              <TableBody>
                {data.visible.map((v, i) =>
                  dataItem(
                    i,
                    data.byRow ? data.rowname[i] : data.colname[i],
                    v,
                    () => update(id, ["data", "visible", i], !v)
                  )
                )}
              </TableBody>
            </Table>
          </div>
        );
    }
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return Array.from(data.values(), (data, ind) => (
    <ExpansionPanel
      expanded={expanded === data.id}
      onChange={handleChange(data.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {data.name}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{dataParse(data)}</ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button>Add to Cart</Button>
        <Button color="secondary" onClick={() => del(data.id)}>
          Delete
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  ));
}
