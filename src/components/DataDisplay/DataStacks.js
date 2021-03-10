import React from "react";
import useData from "hooks/data";
import DataParser from "./DataParser";

export default function DataStacks(props) {
  const data = useData((state) => state.data);
  return (
    <group>
      {Array.from(data.values(), (data, ind) => (
        <DataParser
          key={ind}
          type={data.type}
          mode={data.mode}
          visible={data.visible}
          data={data.data}
        ></DataParser>
      ))}
    </group>
  );
}
