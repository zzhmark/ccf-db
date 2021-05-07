import React from "react";
import Table from "./VirtualizedTable";
import Paper from "@material-ui/core/Paper";

export default function Dataframe(frame) {
  const { records, colnames } = frame;
  const rows = records.map((v) =>
    Object.fromEntries(colnames.map((vv, i) => [vv, v[i]]))
  );
  return (
    <Paper style={{ height: "30rem", marginTop: "2rem", marginBottom: "2rem" }}>
      <Table
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={colnames.map((v) => ({ width: 1000, label: v, dataKey: v }))}
      />
    </Paper>
  );
}
