/*
该模块用于3D显示器的内容展示，包含了坐标轴、网格等一系列基本模型物件
其中可以嵌套相应的大脑或数据模型，根据需要进行引入
这个场景也可以作为一种布局，未来可以把不同的布局统一收集起来，作为不同的layout在不同场景中使用
*/

import React, { Suspense } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import OitRenderer from "./OitRenderer";
import { useControls } from "hooks";
import BrainTemplate from "../Brain/BrainTemplate";
import shallow from "zustand/shallow";

// 小配件

const BasicScene = ({ children }) => {
  // 以下小配件可以直接通过threejs的函数生成模型对象，然后通过加primitive的方式嵌入r3f
  // 增加两个位于中心的坐标系
  const [controls, setCamera] = useControls(
    (state) => [state.controls, state.setCamera],
    shallow
  );
  let axisX = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-350, 0, 0),
    700,
    0xff0000,
    20,
    10
  );
  let axisY = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0).normalize(),
    new THREE.Vector3(0, -350, 0),
    700,
    0x00ff00,
    20,
    10
  );
  let axisZ = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1).normalize(),
    new THREE.Vector3(0, 0, -350),
    700,
    0x0000ff,
    20,
    10
  );
  // 给底面做一个网格
  const grid = new THREE.GridHelper(600, 30, 0x888888, 0x888888);
  grid.position.y = -150;

  const { gl, size, camera } = useThree();
  // unmounting
  let far, position;
  React.useEffect(() => {
    far = camera.far;
    position = camera.position;
    return () => setCamera({ far, position });
  }, [camera]);

  // oit
  let oitPass = new OitRenderer(gl, size);
  useFrame(({ scene, camera }) => {
    if (controls.oit) {
      let opaqueObjects = [];
      let transparentObjects = [];

      function searchMesh(a) {
        if (a.type == "Mesh") {
          if (a.material.transparent) transparentObjects.push(a);
          else opaqueObjects.push(a);
        } else if (a.type == "Group") a.children.forEach(searchMesh);
      }

      scene.children.forEach((c) => searchMesh(c));
      oitPass.render(scene, camera, opaqueObjects, transparentObjects);
    } else {
      gl.render(scene, camera);
    }
  }, 1);
  return (
    <>
      <Sky
        visible={controls.background}
        distance={450000} // Camera distance (default=450000)
        inclination={0.8} // Sun elevation angle from 0 to 1 (default=0)
        azimuth={0.5} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        rayleigh={0.001}
        exposure={0.1}
        turbidity={3}
        mieCoefficient={0.001}
        mieDirectionalG={0.15}
      />
      {/* camera的控制方式，可自定义使操作更舒适 */}
      <OrbitControls
        dampingFactor={0.3}
        screenSpacePanning
        // camera={myCamera.current}
      />
      {/* 环境光，为了使视觉效果比较好，可进一步修改 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[1000, 1000, 0]} intensity={0.5} />
      <pointLight position={[-1000, 0, -1000]} intensity={0.5} />
      <pointLight position={[1000, -1000, 1000]} intensity={0.5} />
      {/* 为了使模型能实时工作，suspense不可少 */}
      <primitive object={axisX} visible={controls.axis.includes("x")} />
      <primitive object={axisY} visible={controls.axis.includes("y")} />
      <primitive object={axisZ} visible={controls.axis.includes("z")} />
      <primitive object={grid} visible={controls.grid} />
      <Suspense fallback={null}>
        {children}
        {controls.slicing && (
          <BrainTemplate
            x={controls.sliceX}
            y={controls.sliceY}
            z={controls.sliceZ}
          />
        )}
      </Suspense>
      {/* <Viewcube /> */}
      {/* 右上角的小配件，以后还可以进一步改进 */}
    </>
  );
};

export default BasicScene;
