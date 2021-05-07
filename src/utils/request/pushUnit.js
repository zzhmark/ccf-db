export default async function pushUnit(id, setData) {
    // get unit
    let unit_res = await fetch("http://192.168.3.148:5000/get_unit?id=" + id, {
      method: "GET",
      mode: "cors",
    });
    let unit_json = await unit_res.json();
    let [
      unit_id,
      strategy_id,
      frame_id,
      title,
      description,
      mapping,
      filter,
    ] = unit_json["records"][0];
    // get strategy
    let strategy_res = await fetch(
      "http://192.168.3.148:5000/get_strategy?id=" + strategy_id,
      {
        method: "GET",
        mode: "cors",
      }
    );
    let strategy_json = await strategy_res.json();
    // get frame
    let frame_res = await fetch(
      "http://192.168.3.148:5000/get_frame?id=" + frame_id,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const { mode } = strategy_json["records"][0][2][0];
    let frame_json = await frame_res.json();
    // processing frame
    let [a, b, c] = ["x", "y", "score"].map((v) =>
      frame_json["colnames"].indexOf(mapping[v]["colname"])
    );
    let datatable = frame_json["records"].map((v, i) => ({
      i: i,
      y: mapping["y"]["chart"][v[b]],
      x: mapping["x"]["chart"][v[a]],
      score: v[c],
      ...Object.fromEntries(
        filter.map((vv) => [
          vv["column"],
          v[frame_json["colnames"].indexOf(vv["column"])],
        ])
      ),
    }));
    setData(id, {
      id: id,
      type: "relation matrix",
      title: title,
      description: description,
      mode: mode,
      visible: true,
      chart: {
        color: ["score", "#BAE7FF-#1890FF-#0050B3"],
        filter: filter.map((v) => [
          v["column"],
          (x) => v["filter"].reduce((a, b) => a || b == x, true),
        ]),
        data: datatable,
        scale: {
          x: {
            values: Object.keys(mapping["x"]["chart"]),
            ...strategy_json["records"][0][1][0]["chart"]["scale"]["x"],
          },
          y: {
            values: Object.keys(mapping["y"]["chart"]),
            ...strategy_json["records"][0][1][0]["chart"]["scale"]["y"],
          },
        },
        ...strategy_json["records"][0][1]["chart"],
      },
      viewer: {
        visible: datatable.map(() => false),
        load: datatable.map(() => false),
        color: datatable.map(() => null),
        table: datatable,
        rowid: Object.values(mapping["y"]["view"]),
        colid: Object.values(mapping["x"]["view"]),
      },
    });
  };