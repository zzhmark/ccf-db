import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Close from "@material-ui/icons/Close";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Muted from "components/Typography/Muted";

import useModel from "helpers/model";
import BrainTag from "./BrainTag";

const useStyles = makeStyles(styles);

export default function BrainList(props) {
  const classes = useStyles();
  const brains = useModel((state) => state.brains);
  const updateBrains = useModel((state) => state.update);
  const { rtlActive } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive,
  });

  let tabRows = [];
  for (let i in brains) {
    tabRows.push(
      <TableRow key={i} className={classes.tableRow} hover>
        <TableCell className={tableCellClasses} align="left">
          <BrainTag name={brains[i].name} color={brains[i].color} />
        </TableCell>
        <TableCell className={tableCellClasses} align="left">
          <Muted>{brains[i].description}</Muted>
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
            checked={brains[i].visible}
            tabIndex={-1}
            onChange={(e) => {
              e.stopPropagation();
              updateBrains((state) => {
                state.brains[i].visible = !brains[i].visible;
              });
            }}
            checkedIcon={<VisibilityIcon />}
            icon={<VisibilityOutlinedIcon />}
          />
          <IconButton aria-label="Remove" className={classes.tableActionButton}>
            <Close
              className={classes.tableActionButtonIcon + " " + classes.close}
            />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table className={classes.table}>
      <TableBody>{tabRows}</TableBody>
    </Table>
  );
}
