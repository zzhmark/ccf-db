/*
该模块用于3D显示器的内容展示，包含了坐标轴、网格等一系列基本模型物件
其中可以嵌套相应的大脑或数据模型，根据需要进行引入
这个场景也可以作为一种布局，未来可以把不同的布局统一收集起来，作为不同的layout在不同场景中使用
*/

import React from "react";
import { Canvas } from "react-three-fiber";
import { Loader } from "@react-three/drei";
import BasicScene from "./BasicScene";

const BasicViewer = ({ canvasStyle, cameraStyle, children }) => {
  return (
    <>
      <Canvas style={canvasStyle} camera={cameraStyle}>
        <BasicScene>{children}</BasicScene>
      </Canvas>
      <Loader />
    </>
  );
};

export default BasicViewer;
