import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function BrainLoader({
  id,
  visible,
  opacity,
  transparent,
  metalness,
  roughness,
  color,
}) {
  const { nodes } = useGLTF(
    document.location.protocol +
      "//" +
      document.location.hostname +
      "/get_draco?id=" +
      id
  );
  const u = Object.values(nodes)[0]
    ["geometry"].clone(true)
    .scale(-1, -1, -1)
    .translate(264, 154.6, 228);
  return (
    <mesh visible={visible}>
      <primitive object={u} attach="geometry" />
      <meshStandardMaterial
        opacity={opacity}
        transparent={transparent}
        metalness={metalness}
        roughness={roughness}
        color={color}
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
