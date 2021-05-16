import create from "zustand";
import produce from "immer";

const useData = create((set) => ({
  data: new Map(),
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
  addData: (id, ingredient, dataframe) =>
    set(
      produce((state) => {
        state.data.set(id, {
          id: id

        });
        return state;
      })
    )
}));

export default useData;
