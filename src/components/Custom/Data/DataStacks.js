import React from "react";
import { useData } from "hooks";
import DataViewer from "./Views/DataViewer";

export default function DataStacks() {
  const data = useData((state) => state.data);
  return (
    <group name="data">
      {Array.from(data.values(), (data, i) => (
        <DataViewer {...data} key={i} />
      ))}
    </group>
  );
}
