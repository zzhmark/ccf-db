import create from 'zustand'
import produce from 'immer'

const useModel = create((set) => {
  return {
    brains: {},
    data: {},
    update: (fn) => set(produce(fn)),
  }
})

export default useModel
