import React from "react";
import { Sphere, RoundedBox, Line } from "@react-three/drei";
import BrainLoader from "components/Brain/BrainLoader";

function brain({ data, visible }) {
  const { table, colid, rowid } = data;
  const max = table.reduce(
    (a, b) => Math.max(a, b["score"]),
    table[0]["score"]
  );
  return (
    <group>
      {table.map((v, i) => {
        let { x, y, score } = v;
        return (
          <group key={i}>
            <BrainLoader
              id={colid[x]}
              color={RainBowColor(score, max)}
              visible={data.visible[i] && visible}
              opacity={0.1}
              roughness={0.8}
              transparent={true}
              metalness={0.5}
            />
            <BrainLoader
              id={rowid[y]}
              color={RainBowColor(score, max)}
              visible={data.visible[i] && visible}
              opacity={0.1}
              roughness={0.8}
              transparent={true}
              metalness={0.5}
            />
          </group>
        );
      })}
    </group>
  );
}

export default function DataParser(props) {
  const { type, mode, data, visible } = props;
  switch (type) {
    case "relation matrix":
      switch (mode) {
        case "bone":
          return bone(data, visible);
        case "brain":
          return brain({ data, visible });
      }
  }
}
