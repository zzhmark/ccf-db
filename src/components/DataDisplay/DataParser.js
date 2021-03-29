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
  const { matrix, colid, rowid, colcoord, rowcoord } = data;
  let regions = [];
  let max;
  for (let i in rowid) {
    regions.push([]);
    regions[regions.length - 1].key = rowid[i];
    max = matrix[i].reduce((a, b) => {
      return Math.max(a, b);
    });
    for (let j in colid) {
      regions[regions.length - 1].push(
        <>
          <Sphere
            key={colid[j] + ".sphere"}
            args={[(matrix[i][j] / max) * 10, 32, 32]}
            visible={data.visible[i][j] && visible}
            position={colcoord[j].map((value, key) => {
              return ct[key] - value;
            })}
          >
            <meshBasicMaterial color={RainBowColor(matrix[i][j], max)} />
          </Sphere>
          <Line
            key={colid[j] + ".line"}
            points={[
              rowcoord[i].map((value, key) => {
                return ct[key] - value;
              }),
              colcoord[j].map((value, key) => {
                return ct[key] - value;
              }),
            ]}
            color={RainBowColor(matrix[i][j], max)}
            visible={data.visible[i][j] && visible}
            lineWidth={Math.max((matrix[i][j] / max) * 5, 1)}
            dashed={(matrix[i][j] / max) * 5 < 1}
          ></Line>
        </>
      );
    }
    regions[regions.length - 1].push(
      <RoundedBox
        key={rowid[i]}
        args={[5, 5, 5]}
        radius={1}
        smoothness={4}
        visible={data.visible[i].reduce((a, b) => a || b) && visible}
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
  const { matrix, colid, rowid, colcoord, rowcoord } = data;
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
            key={colid[j] + ".brain"}
            url={geturl(colid[j])}
            color={RainBowColor(matrix[i][j], max)}
            visible={data.visible[i][j] && visible}
            opacity={0.1}
            roughness={0.8}
            // transparent={data.transparent[i][j]}
            transparent={true}
            metalness={0.5}
          />
          <Line
            key={colid[j] + ".line"}
            points={[
              rowcoord[i].map((value, key) => {
                return ct[key] - value;
              }),
              colcoord[j].map((value, key) => {
                return ct[key] - value;
              }),
            ]}
            color={RainBowColor(matrix[i][j], max)}
            visible={data.visible[i][j] && visible}
            lineWidth={Math.max((matrix[i][j] / max) * 5, 1)}
            dashed={(matrix[i][j] / max) * 5 < 1}
          ></Line>
        </>
      );
    }
    regions[regions.length - 1].push(
      <BrainLoader
        key={rowid[i]}
        url={geturl(rowid[i])}
        color={"green"}
        roughness={0.8}
        metalness={0.5}
        transparent={true}
        opacity={0.1}
        visible={data.visible[i].reduce((a, b) => a || b) && visible}
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
