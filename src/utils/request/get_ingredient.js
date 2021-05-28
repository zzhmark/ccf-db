import axios from "axios";

export default async function get_ingredient(ingredient_id) {
  const ing_res = await axios.get(
    document.location.hostname + "/get_ingredient?oid=" + ingredient_id
  );
  const { dataframe_id } = ing_res.data;
  // get frame
  const df_res = await axios.get(
    document.location.hostname + "/get_dataframe?oid=" + dataframe_id["$oid"]
  );
  const { dataframe } = df_res.data;
  return { ingredient: ing_res.data, dataframe };
}
