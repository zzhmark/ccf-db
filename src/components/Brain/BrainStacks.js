/*
该模块用于读取在特定状态下的脑结构，返回一个类似于DOM树的r3f对象
操作时用户动态修改对象的状态从而控制模型的显示和隐藏

它用到的组件是专门为gltf文件编写的loadBrain模块，按照相应的参数即可读取具有特定配置的脑模型
*/

import React from "react";
import useBrains from "hooks/brains";
import BrainLoader from "./BrainLoader.js";

export default function BrainStacks(props) {
  const brains = useBrains((state) => state.brains);
  // array.from 转化出来的id通常和元素的id是一致的，是在map中的实际id

  return (
    <group name="brains">
      {Array.from(brains.values(), (brain, ind) => (
        <BrainLoader
          key={ind}
          // url={brain.url}
          id={brain.id}
          color={brain.color}
          visible={brain.visible}
        />
      ))}
    </group>
  );
}
