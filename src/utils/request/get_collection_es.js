import axios from "axios";

// conditons=[['name', 'value'],['name', 'value'],['name', 'value']]
export default async function get_collection_es({ target, mode }) {
  let col_res;
  switch (mode) {
    case "advanced":
      col_res = await axios.get(
        document.location.protocol +
          "//" +
          document.location.hostname +
          "/search_index?index_name=collection&" +
          target
            .filter((v) => v[0] && v[1])
            .map((v) => v.join("="))
            .join("&")
      );
      break;
    default:
      col_res = await axios.get(
        document.location.protocol +
          "//" +
          document.location.hostname +
          "/search_index_basic?index_name=collection&content=" +
          target
      );
  }
  return col_res.data;
}
