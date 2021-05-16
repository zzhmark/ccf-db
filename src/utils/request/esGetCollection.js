import axios from "axios";

// conditons=[['name', 'value'],['name', 'value'],['name', 'value']]
export default async function esGetCollection({ setResults, target, mode }) {
  let col_res;
  switch (mode) {
    case "advanced":
      col_res = await axios.get(
        "http://192.168.3.148:5000/search_index?index_name=collection&" +
        target
          .filter((v) => v[0] && v[1])
          .map((v) => v.join("="))
          .join("&")
      );
      break;
    default:
      col_res = await axios.get(
        "http://192.168.3.148:5000/search_index_basic?index_name=collection&content=" +
        target
      );
  }
  setResults(col_res["data"]);
}
