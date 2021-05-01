import create from "zustand";
import produce from "immer";

const useData = create((set) => ({
  data: new Map(),
  update: (id, fields, value) =>
    set(
      produce((state) => {
        fields
          .slice(0, -1)
          .reduce((pointer, field) => pointer[field], state.data.get(id))[
          fields.slice(-1)
        ] = value;
        return state;
      })
    ),
  del: (id) =>
    set(
      produce((state) => {
        state.data.delete(id);
        return state;
      })
    ),
  set: (id, element) =>
    set(
      produce((state) => {
        state.data.set(id, element);
        return state;
      })
    ),
}));

export default useData;
