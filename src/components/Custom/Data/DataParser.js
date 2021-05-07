import React from "react";
import BrainLoader from "../Brain/BrainLoader";

function brain({ viewer, visible }) {
  const { table, colid, rowid, color, load } = viewer;

  return (
    <group>
      {table.map((v, i) => {
        let { x, y } = v;
        return (
          load[i] && (
            <group key={i}>
              <BrainLoader
                id={colid[x]}
                color={color[i]}
                visible={viewer.visible[i] && visible}
                opacity={0.1}
                roughness={0.8}
                transparent={true}
                metalness={0.5}
              />
              <BrainLoader
                id={rowid[y]}
                color={color[i]}
                visible={viewer.visible[i] && visible}
                opacity={0.1}
                roughness={0.8}
                transparent={true}
                metalness={0.5}
              />
            </group>
          )
        );
      })}
    </group>
  );
}

export default function DataParser(props) {
  const { type, mode, viewer, visible } = props;
  switch (type) {
    case "relation matrix":
      switch (mode) {
        case "brain":
          return brain({ viewer, visible });
      }
  }
}
