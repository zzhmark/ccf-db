import axios from "axios";

// conditons=[['name', 'value'],['name', 'value'],['name', 'value']]
export default async function get_collection_es({ target, mode }) {
  let col_res;
  switch (mode) {
    case "advanced":
      col_res = await axios.get(
        process.env.REACT_APP_API_URL +
          "/search_index?index_name=collection&" +
          target
            .filter((v) => v[0] && v[1])
            .map((v) => v.join("="))
            .join("&")
      );
      break;
    default:
      col_res = await axios.get(
        process.env.REACT_APP_API_URL +
          "/search_index_basic?index_name=collection&content=" +
          target
      );
  }
  return col_res.data;
}
