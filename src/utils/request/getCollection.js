import axios from "axios";

// export default async function getCollection(id) {
//   const col_res = await axios.get(
//     "http://192.168.3.148:5000/get_collection?id=" + id
//   );
//   const [
//     collection_id,
//     frame_id,
//     literature_id,
//     recipe_id,
//     title,
//     abstract,
//   ] = col_res.data["records"][0];
//   // frame
//   const frame_res = await Promise.all(
//     frame_id.map(
//       async (v) =>
//         await axios.get("http://192.168.3.148:5000/get_frame?id=" + v)
//     )
//   );

//   const frame_info_res = await Promise.all(
//     frame_id.map(
//       async (v) =>
//         await axios.get("http://192.168.3.148:5000/get_frame_info?id=" + v)
//     )
//   );

//   // literature
//   const lit_res = await Promise.all(
//     literature_id.map(
//       async (v) =>
//         await axios.get("http://192.168.3.148:5000/get_literature?id=" + v)
//     )
//   );

//   //recipe
//   const recipe_res = await Promise.all(
//     recipe_id.map(
//       async (v) =>
//         await axios.get("http://192.168.3.148:5000/get_recipe?id=" + v)
//     )
//   );

//   return { col_res, frame_res, lit_res, recipe_res, frame_info_res };
// }

export default async function getCollection(id) {
  // collection
  const col_res = await axios.get(
    "http://192.168.3.148:5000/get_collection?oid=" + id
  );
  const { dataframe_id, recipe_id, reference_id } = col_res.data;

  // reference
  const ref_res = await Promise.all(
    reference_id.map(
      async (v) =>
        await axios.get("http://192.168.3.148:5000/get_reference?oid=" + v["$oid"])
    )
  );

  // dataframe
  const df_res = await Promise.all(
    dataframe_id.map(
      async (v) =>
        await axios.get("http://192.168.3.148:5000/get_dataframe?oid=" + v["$oid"])
    )
  );

  //recipe
  const recipe_res = await Promise.all(
    recipe_id.map(
      async (v) =>
        await axios.get("http://192.168.3.148:5000/get_recipe?oid=" + v["$oid"])
    )
  );

  return { col_res, ref_res, df_res, recipe_res };
}
