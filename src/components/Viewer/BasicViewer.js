/*
该模块用于3D显示器的内容展示，包含了坐标轴、网格等一系列基本模型物件
其中可以嵌套相应的大脑或数据模型，根据需要进行引入
这个场景也可以作为一种布局，未来可以把不同的布局统一收集起来，作为不同的layout在不同场景中使用
*/

import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 小配件
import Viewcube from "./Viewcube.js";

const BasicViewer = ({ canvasStyle, cameraStyle, children }) => {
  // 以下小配件可以直接通过threejs的函数生成模型对象，然后通过加primitive的方式嵌入r3f
  // 增加两个位于中心的坐标系
  const ax1 = new THREE.AxesHelper(1000);
  const ax2 = new THREE.AxesHelper(1000);
  // 给底面做一个网格
  const grid = new THREE.GridHelper(600, 60, 0x888888, 0x888888);
  grid.position.y = -150;
  return (
    <Canvas style={canvasStyle} camera={cameraStyle}>
      {/* camera的控制方式，可自定义使操作更舒适 */}
      <OrbitControls dampingFactor={0.3} screenSpacePanning />
      {/* 环境光，为了使视觉效果比较好，可进一步修改 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[1000, 1000, 0]} intensity={0.5} />
      <pointLight position={[-1000, 0, -1000]} intensity={0.5} />
      <pointLight position={[1000, -1000, 1000]} intensity={0.5} />
      {/* 为了使模型能实时工作，suspense不可少 */}
      <Suspense fallback={null}>
        <primitive object={ax1} />
        <primitive object={ax2} scale={[-1, -1, -1]} />
        <primitive object={grid} />
        {children}
        <Viewcube />
      </Suspense>
      {/* 右上角的小配件，以后还可以进一步改进 */}
    </Canvas>
  );
};

export default BasicViewer;
