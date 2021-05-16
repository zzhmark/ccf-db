import create from "zustand";
import produce from "immer";

const useStore = create((set) => ({
  store: new Map(),
  update: (id, fields, values) =>
    set(
      produce((state) => {
        fields.forEach((v, i) => {
          v
            .slice(0, -1)
            .reduce((pointer, field) => pointer[field], state.data.get(id))[
            v.slice(-1)
          ] = values[i];
        });
        return state;
      })
    ),
  del: (id) =>
    set(
      produce((state) => {
        state.store.delete(id);
        return state;
      })
    ),
  set: (id, element) =>
    set(
      produce((state) => {
        state.store.set(id, element);
        return state;
      })
    ),
}));

export default useStore;
