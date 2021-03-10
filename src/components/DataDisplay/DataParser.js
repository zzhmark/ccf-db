import React from "react";
import { Sphere, RoundedBox, Line } from "@react-three/drei";
import BrainLoader from "components/Brain/BrainLoader";

const ct = [297.0842299247068, 159.50694219369672, 227.69404433238435];

function RainBowColor(length, maxLength) {
  var i = (-length * 22.5 + 17.5) / maxLength;
  var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
  var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
  var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
  return "rgb(" + r + "," + g + "," + b + ")";
}

const ball = (data, visible) => {
  const { matrix, colid, rowid, colname, rowname, colcoord, rowcoord } = data;
  let regions = [];
  let max;
  for (let i in rowid) {
    regions.push([]);
    max = matrix[i].reduce((a, b) => {
      return Math.max(a, b);
    });
    for (let j in colid) {
      regions[regions.length - 1].push(
        <>
          <Sphere
            args={[(matrix[i][j] / max) * 10, 32, 32]}
            visible={data.visible[i] && visible}
            position={colcoord[j].map((value, key) => {
              return ct[key] - value;
            })}
          >
            <meshBasicMaterial color={RainBowColor(matrix[i][j], max)} />
          </Sphere>
          <Line
            points={[
              rowcoord[i].map((value, key) => {
                return ct[key] - value;
              }),
              colcoord[j].map((value, key) => {
                return ct[key] - value;
              }),
            ]}
            color={RainBowColor(matrix[i][j], max)}
            visible={data.visible[i] && visible}
            lineWidth={Math.max((matrix[i][j] / max) * 5, 1)}
            dashed={(matrix[i][j] / max) * 5 < 1}
          ></Line>
        </>
      );
    }
    regions[regions.length - 1].push(
      <RoundedBox
        args={[5, 5, 5]}
        radius={1}
        smoothness={4}
        visible={data.visible[i] && visible}
        position={rowcoord[i].map((value, key) => {
          return ct[key] - value;
        })}
      >
        <meshBasicMaterial attach="material" color={"black"} />
      </RoundedBox>
    );
  }
  return <group>{regions}</group>;
};

const brain = (data, visible) => {
  const { matrix, colid, rowid, colname, rowname, colcoord, rowcoord } = data;
  const geturl = (id) => "/brains/" + id + ".gltf";
  let regions = [];
  let max;
  for (let i in rowid) {
    regions.push([]);
    max = matrix[i].reduce((a, b) => {
      return Math.max(a, b);
    });
    for (let j in colid) {
      regions[regions.length - 1].push(
        <>
          <BrainLoader
            url={geturl(colid[j])}
            color={RainBowColor(matrix[i][j], max)}
            visible={data.visible[i] && visible}
            roughness={0.5}
            metalness={0.1}
          />
          <Line
            points={[
              rowcoord[i].map((value, key) => {
                return ct[key] - value;
              }),
              colcoord[j].map((value, key) => {
                return ct[key] - value;
              }),
            ]}
            color={RainBowColor(matrix[i][j], max)}
            visible={data.visible[i] && visible}
            lineWidth={Math.max((matrix[i][j] / max) * 5, 1)}
            dashed={(matrix[i][j] / max) * 5 < 1}
          ></Line>
        </>
      );
    }
    regions[regions.length - 1].push(
      <BrainLoader
        url={geturl(rowid[i])}
        color={"green"}
        roughness={0.5}
        metalness={0.1}
        opacity={1}
        visible={data.visible[i] && visible}
      />
    );
  }
  return <group>{regions}</group>;
};

export default function DataParser(props) {
  const { type, mode, data, visible } = props;
  switch (type) {
    case "relation matrix":
      switch (mode) {
        case "ball":
          return ball(data, visible);
        case "brain":
          return brain(data, visible);
      }
  }
}
