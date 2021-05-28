import axios from "axios";

export default async function get_brain_metadata(id) {
  const res = await axios.get(
    document.location.protocol +
      "//" +
      document.location.hostname +
      "/get_brain_metadata?" +
      id.map((v) => "id=" + v).join("&")
  );
  return res;
}
