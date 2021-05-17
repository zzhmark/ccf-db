/*
该模块用于3D显示器的内容展示，包含了坐标轴、网格等一系列基本模型物件
其中可以嵌套相应的大脑或数据模型，根据需要进行引入
这个场景也可以作为一种布局，未来可以把不同的布局统一收集起来，作为不同的layout在不同场景中使用
*/

import React from "react";
import { Canvas } from "react-three-fiber";
import { Loader } from "@react-three/drei";
import BasicScene from "./BasicScene";
import { useViewport } from "utils";
import { useControls } from "hooks";

const BasicViewer = ({ children }) => {
  const { width } = useViewport();
  const camera = useControls((state) => state.controls.camera);

  return (
    <>
      <Canvas
        style={{
          height: width >= 960 ? "calc(min(80vw, 80vh)" : "40vh",
          backgroundColor: "#e6e6e3",
        }}
        camera={camera}
      >
        <BasicScene>{children}</BasicScene>
      </Canvas>
      <Loader />
    </>
  );
};

export default BasicViewer;
