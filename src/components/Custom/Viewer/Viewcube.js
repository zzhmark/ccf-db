import * as THREE from "three";
import { Matrix4, Scene } from "three";
import React, { useMemo, useRef, useState } from "react";
import { createPortal, useFrame, useThree } from "react-three-fiber";
import { OrthographicCamera, useCamera } from "@react-three/drei";

export default function Viewcube() {
  const { gl, scene, camera, size } = useThree();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  const ref = useRef();
  const axref1 = useRef();
  const axref2 = useRef();
  const [hover, set] = useState(null);
  const matrix = new Matrix4();
  useFrame(() => {
    matrix.copy(camera.matrix).invert();
    ref.current.quaternion.setFromRotationMatrix(matrix);
    axref1.current.quaternion.setFromRotationMatrix(matrix);
    axref2.current.quaternion.setFromRotationMatrix(matrix);
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(virtualScene, virtualCam.current);
  }, 1);
  const ax1 = new THREE.AxesHelper(100);
  const ax2 = new THREE.AxesHelper(100);

  ax1.material.linewidth = 20;
  ax2.material.linewidth = 20;

  return createPortal(
    <>
      <OrthographicCamera
        ref={virtualCam}
        makeDefault={false}
        position={[0, 0, 100]}
      />
      <mesh
        ref={ref}
        raycast={useCamera(virtualCam)}
        position={[size.width / 2 - 80, size.height / 2 - 80, 0]}
        onPointerOut={(e) => set(null)}
        onPointerMove={(e) => set(Math.floor(e.faceIndex / 2))}
      >
        {[...Array(6)].map((_, index) => (
          <meshLambertMaterial
            attachArray="material"
            key={index}
            color={hover === index ? "hotpink" : "white"}
          />
        ))}
        <boxBufferGeometry attach="geometry" args={[60, 60, 60]} />
      </mesh>
      <primitive
        ref={axref1}
        object={ax1}
        position={[size.width / 2 - 80, size.height / 2 - 80, 0]}
      />
      <primitive
        ref={axref2}
        object={ax2}
        position={[size.width / 2 - 80, size.height / 2 - 80, 0]}
        scale={[-1, -1, -1]}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </>,
    virtualScene
  );
}
