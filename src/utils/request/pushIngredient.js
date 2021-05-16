import axios from "axios";

export default async function pushIngredient(ingredient_id, setData) {
  const ing_res = await axios.get(
    process.env.REACT_APP_API_URL + "/get_ingredient?oid=" + ingredient_id
  );
  const { dataframe_id, options, title, description } = ing_res.data;
  const { viewer, chart } = options;
  // get frame
  const df_res = await axios.get(
    process.env.REACT_APP_API_URL + "/get_dataframe?oid=" + dataframe_id["$oid"]
  );
  const { dataframe } = df_res.data;
  // processing frame
  setData(ingredient_id, {
    id: ingredient_id,
    type: "relation matrix",
    title: title,
    description: description,
    visible: true,
    dataframe_id: dataframe_id["$oid"],
    data: dataframe.map((v, i) => ({ ...v, row: i })),
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
    viewer: {
      visible: dataframe.map(() => false),
      load: dataframe.map(() => false),
      color: dataframe.map(() => null),
      table: dataframe,
      ...viewer,
    },
  });
}
