import create from "zustand";
import produce from "immer";

// 这里使用Map存储数据，Map可以保证元素的插入顺序不变，并且拥有log2n的效率
// 设计上，该hook提供了一些简便的modifier，可以根据需要模仿定制
// Map的增删机制是顺序的，添加永远在末尾，修改一定要用set，如果没有则添加，有则修改
// 修改某一元素的某一项内容，推荐用get，然后赋值，这样保证异步操作，同时该元素的其他项目保持不变，写法也很简单
// zustand在运行时会开辟一个独立的状态机，全局的hook
// create函数接收一个自动生成的set函数，set可以实现从n到n+1的状态修改（所有modifier都是set包装的函数，只要输出是difference就可以了）
// immer 保证了直接用brains修改数据会异常，而且代码写出来更优雅

const useControls = create((set) => ({
  controls: {
    oit: false,
    grid: true,
    axis: [true, true, true],
    background: true,
    slicing: false,
    sliceX: { visible: true, value: 66 },
    sliceY: { visible: true, value: 40 },
    sliceZ: { visible: true, value: 57 }
  },
  setOit: (flag) =>
    set(
      produce((state) => {
        state.controls.oit = flag;
      })
    ),
  setSliceX: (flag, value) =>
    set(
      produce((state) => {
        state.controls.sliceX.visible = flag;
        state.controls.sliceX.value = value;
      })
    ),
  setSliceY: (flag, value) =>
    set(
      produce((state) => {
        state.controls.sliceY.visible = flag;
        state.controls.sliceY.value = value;
      })
    ),
  setSliceZ: (flag, value) =>
    set(
      produce((state) => {
        state.controls.sliceZ.visible = flag;
        state.controls.sliceZ.value = value;
      })
    ),
  setGrid: (flag) =>
    set(
      produce((state) => {
        state.controls.grid = flag;
      })
    ),
  setAxis: (i, flag) =>
    set(
      produce((state) => {
        state.controls.axis[i] = flag;
      })
    ),
  setBackground: (flag) =>
    set(
      produce((state) => {
        state.controls.background = flag;
      })
    ),
  setSlicing: (flag) =>
    set(
      produce((state) => {
        state.controls.slicing = flag;
      })
    )
}));

export default useControls;
