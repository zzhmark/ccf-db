import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function BrainLoader(props) {
  const gltf = useGLTF(process.env.PUBLIC_URL + props.url);
  for (let key in gltf.materials) {
    gltf.materials[key].opacity = props.opacity;
    gltf.materials[key].transparent = props.transparent;
    gltf.materials[key].metalness = props.metalness;
    gltf.materials[key].roughness = props.roughness;
    gltf.materials[key].color.set(props.color);
    gltf.materials[key].side = THREE.DoubleSide;
    gltf.materials[key].depthWrite = false;
  }
  return <primitive object={gltf.scene} visible={props.visible} />;
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
