import React from "react";
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
import { Close, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import DataFrame from "./Dataframe";
import { useStore } from "hooks";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row({ row, children, id }) {
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
        {row.map((v) => (
          <TableCell>{v}</TableCell>
        ))}
        <TableCell>
          <IconButton
            aria-label="Remove"
            className={classes.tableActionButton}
            onClick={(e) => {
              e.stopPropagation();
              del(id);
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
          {body.map((v, i) => {
            const { title, description, dataframe, orient } = v[1];
            return (
              <Row key={i} row={[title, description]} id={v[0]}>
                {DataFrame({dataframe, orient})}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
