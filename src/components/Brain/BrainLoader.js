import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
export default function BrainLoader(props) {
  const { nodes } = useGLTF(process.env.PUBLIC_URL + props.url);
  return (
    <mesh visible={props.visible}>
      <primitive object={Object.values(nodes)[0].geometry} attach="geometry" />
      <meshStandardMaterial
        opacity={props.opacity}
        transparent={props.transparent}
        metalness={props.metalness}
        roughness={props.roughness}
        color={props.color}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

BrainLoader.defaultProps = {
  visible: true,
  opacity: 0.3,
  transparent: true,
  metalness: 0.7,
  roughness: 0.9,
  side: THREE.DoubleSide,
  depthWrite: false,
  color: "#f0f0f0",
};
