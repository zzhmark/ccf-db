/*
该模块用于读取在特定状态下的脑结构，返回一个类似于DOM树的r3f对象
操作时用户动态修改对象的状态从而控制模型的显示和隐藏

它用到的组件是专门为gltf文件编写的loadBrain模块，按照相应的参数即可读取具有特定配置的脑模型
*/

import React from "react";
import useModel from "helpers/model";
import BrainLoader from "./BrainLoader.js";

export default function BrainStacks(props) {
  let regions = [];
  const brains = useModel((state) => state.brains);
  for (let id in brains) {
    regions.push(
      <BrainLoader
        key={"brains." + id}
        url={brains[id].url}
        color={brains[id].color}
        visible={brains[id].visible}
      ></BrainLoader>
    );
  }
  return <group>{regions}</group>;
}
