import axios from "axios";

export default async function get_brain_metadata(id) {
  const res = await axios.get(
    process.env.REACT_APP_API_URL +
      "/get_brain_metadata?" +
      id.map((v) => "id=" + v).join("&")
  );
  return res;
}