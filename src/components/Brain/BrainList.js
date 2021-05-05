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

import { useBrains } from "hooks";
import BrainTag from "./BrainTag";
import shallow from "zustand/shallow";

const useStyles = makeStyles(styles);

export default function BrainList(props) {
  const classes = useStyles();
  const [brains, update, del] = useBrains(
    (state) => [state.brains, state.update, state.del],
    shallow
  );
  const { rtlActive } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive,
  });
  const toggleVisible = (id) =>
    update(id, ["visible"], !brains.get(id).visible);

  return (
    <Table className={classes.table}>
      <TableBody>
        {Array.from(brains.values(), (brain, ind) => (
          <TableRow key={ind} className={classes.tableRow} hover>
            <TableCell className={tableCellClasses} align="left">
              <BrainTag color={brain.color}>{brain.name}</BrainTag>
            </TableCell>
            <TableCell className={tableCellClasses} align="left">
              <Muted>{brain.description}</Muted>
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
                checked={brain.visible}
                tabIndex={-1}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleVisible(brain.id);
                }}
                checkedIcon={<VisibilityIcon />}
                icon={<VisibilityOutlinedIcon />}
              />
              <IconButton
                aria-label="Remove"
                className={classes.tableActionButton}
                onClick={(e) => {
                  e.stopPropagation();
                  del(brain.id);
                }}
              >
                <Close
                  className={
                    classes.tableActionButtonIcon + " " + classes.close
                  }
                />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
