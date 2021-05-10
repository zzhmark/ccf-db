import axios from "axios";

export default async function getBrainMetadata(id) {
  const res = await axios.get(
    "http://192.168.3.148:5000/get_brain_metadata?" +
      id.map((v) => "id=" + v).join("&")
  );
  return res
}
