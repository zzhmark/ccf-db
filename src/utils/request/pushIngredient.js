import axios from "axios";

export default async function pushIngredient(ingredient_id, setData) {
  const ing_res = await axios.get(
    "http://192.168.3.148:5000/get_ingredient?oid=" + ingredient_id
  );
  const {
    dataframe_id,
    options,
    title,
    description,
    mapping,
    filter,
  } = ing_res.data;
  const { viewer, chart } = options;
  // get frame
  const df_res = await axios.get(
    "http://192.168.3.148:5000/get_dataframe?oid=" + dataframe_id['$oid']
  );
  const { dataframe } = df_res.data;
  // processing frame
  let datatable = dataframe.map((record, i) => ({
    i: i,
    y: mapping["y"].chart[record[mapping["y"].colname]],
    x: mapping["x"].chart[record[mapping["x"].colname]],
    score: record[mapping["score"].colname],
    ...Object.fromEntries(filter.map((f) => [f.column, record[f.column]])),
  }));
  setData(ingredient_id, {
    id: ingredient_id,
    type: "relation matrix",
    title: title,
    description: description,
    visible: true,
    dataframe_id: dataframe_id["$oid"],
    chart: {
      data: datatable,
      filter: filter.map((f) => {
        let func;
        switch (f.type) {
          default:
            func = (a, b) => a == b
        }
        return [f.column, (x) => f.filter.reduce((a, b) => a || func(b, x), true)];
      }),
      scale: {
        x: {
          values: Object.keys(mapping["x"].chart),
          ...chart.scale["x"],
        },
        y: {
          values: Object.keys(mapping["y"].chart),
          ...chart.scale["y"],
        },
      },
      ...chart,
    },
    viewer: {
      visible: datatable.map(() => false),
      load: datatable.map(() => false),
      color: datatable.map(() => null),
      table: datatable,
      rowid: Object.values(mapping["y"].view),
      colid: Object.values(mapping["x"].view),
      ...viewer
    },
  });
}
