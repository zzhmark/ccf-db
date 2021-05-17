import React from "react";
import VirtualizedTable from "./VirtualizedTable";
import Paper from "@material-ui/core/Paper";

export default function Dataframe({ dataframe, orient }) {
  let rows, colnames;
  switch (orient) {
    case "columns":
      colnames = Object.keys(dataframe);
      rows = Object.values(dataframe)
        .map((series, i) =>
          Object.values(series).map((v) => ({ [colnames[i]]: v }))
        )
        .reduce((a, b) => a.map((v, i) => ({ ...v, ...b[i] })));
      break;
    default:
      rows = dataframe;
      colnames = Object.keys(Object.values(dataframe)[0]);
  }
  return (
    <Paper style={{ height: "30rem", marginTop: "2rem", marginBottom: "2rem" }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={colnames.map((v) => ({
          width: 1000,
          label: v,
          dataKey: v,
        }))}
      />
    </Paper>
  );
}
