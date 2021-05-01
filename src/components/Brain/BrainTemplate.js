import React from "react";
import { NRRDLoader } from "three/examples/jsm/loaders/NRRDLoader";
import { useLoader } from "react-three-fiber";
import { MeshBasicMaterial } from "_three@0.124.0@three";

export default function BrainTemplate({ x, y, z }) {
  const nrrd = useLoader(
    NRRDLoader,
    process.env.PUBLIC_URL + "/average_template_25.nrrd"
  );
  const sliceX = nrrd.extractSlice("x", Math.floor(x.value));
  const sliceY = nrrd.extractSlice("y", Math.floor(y.value));
  const sliceZ = nrrd.extractSlice("z", Math.floor(z.value));
  React.useMemo(() => {
    sliceX.index = x.value;
    sliceX.repaint.call(sliceX);
  }, [x.value]);
  React.useMemo(() => {
    sliceY.index = y.value;
    sliceY.repaint.call(sliceY);
  }, [y.value]);
  React.useMemo(() => {
    sliceZ.index = z.value;
    sliceZ.repaint.call(sliceZ);
  }, [z.value]);
  console.log(nrrd)
  return (
    <group>
      <mesh
        scale={[-4, -4, -4]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-4 * sliceX.mesh.position.x, 0, 0]}
        visible={x.visible}
      >
        <primitive object={sliceX.mesh.geometry} attach="geometry" />
        <primitive object={sliceX.mesh.material} attach="material" />
      </mesh>
      <mesh
        scale={[-4, -4, -4]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -4 * sliceY.mesh.position.y, 0]}
        visible={y.visible}
      >
        <primitive object={sliceY.mesh.geometry} attach="geometry" />
        <primitive object={sliceY.mesh.material} attach="material" />
      </mesh>
      <mesh
        scale={[-4, -4, -4]}
        rotation={[0, 0, 0]}
        position={[0, 0, -4 * sliceZ.mesh.position.z]}
        visible={z.visible}
      >
        <primitive object={sliceZ.mesh.geometry} attach="geometry" />
        <primitive object={sliceZ.mesh.material} attach="material" />
      </mesh>
    </group>
  );
}
