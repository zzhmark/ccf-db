import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import { useSearch } from "hooks";
import shallow from "zustand/shallow";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray() {
  const classes = useStyles();
  const [chips, delChip] = useSearch(
    (state) => [state.chips, state.delChip],
    shallow
  );

  return (
    <div component="ul" className={classes.root}>
      {chips.map((data, i) => (
        <Chip
          key={i}
          color={data.color}
          icon={data.icon}
          label={data.label}
          onDelete={() => delChip(i)}
          className={classes.chip}
        />
      ))}
    </div>
  );
}
