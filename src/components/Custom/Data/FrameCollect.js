import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import Frame from "./Dataframe";
import { useStore } from "hooks";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row, children } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const del = useStore((state) => state.del);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {row.slice(1, 3).map((v) => (
          <TableCell>{v}</TableCell>
        ))}
        <TableCell>
          <IconButton
            aria-label="Remove"
            className={classes.tableActionButton}
            onClick={(e) => {
              e.stopPropagation();
              del(row[0]);
            }}
          >
            <Close
              className={classes.tableActionButtonIcon + " " + classes.close}
            />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {/* {props.title} */}
                Content
              </Typography>
              {children}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ header, body }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {header.map((col) => (
              <TableCell>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((v) => (
            <Row key={v[0]} row={v[1].info.records[0]}>
              {Frame(v[1].frame)}
            </Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
