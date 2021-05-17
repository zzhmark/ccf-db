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
        const { dataframe_id, options, title, description } = ingredient;
        const { chart, type, mapping, colormap } = options;
        state.data.set(id, {
          id: id,
          type: type,
          title: title,
          description: description,
          visible: true,
          dataframe_id: dataframe_id["$oid"],
          data: dataframe.map((v, i) => ({
            ...v,
            _row: i,
            _visible: false,
            _load: false,
          })),
          viewer: {
            load: dataframe.map(() => false),
            visible: dataframe.map(() => true),
          },
          chart: {
            ...chart,
            filter: chart.filter.map((f) => {
              let func;
              switch (f.type) {
                default:
                  func = (a, b) => a == b;
              }
              return [
                f.column,
                (x) => f.filter.reduce((a, b) => a || func(b, x), true),
              ];
            }),
          },
          colormap: colormap,
          mapping: mapping,
        });
        return state;
      })
    ),
}));

export default useData;
