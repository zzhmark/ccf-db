import axios from "axios";

export default async function getCollection(id) {
    const col_res = await axios.get(
      "http://192.168.3.148:5000/get_collection?id=" + id
    );
    const [
      collection_id,
      frame_id,
      literature_id,
      recipe_id,
      title,
      abstract,
    ] = col_res.data["records"][0];
    // frame
    const frame_res = await Promise.all(
      frame_id.map(
        async (v) =>
          await axios.get("http://192.168.3.148:5000/get_frame?id=" + v)
      )
    );
  
    const frame_info_res = await Promise.all(
      frame_id.map(
        async (v) =>
          await axios.get("http://192.168.3.148:5000/get_frame_info?id=" + v)
      )
    );
  
    // literature
    const lit_res = await Promise.all(
      literature_id.map(
        async (v) =>
          await axios.get("http://192.168.3.148:5000/get_literature?id=" + v)
      )
    );
  
    //recipe
    const recipe_res = await Promise.all(
      recipe_id.map(
        async (v) =>
          await axios.get("http://192.168.3.148:5000/get_recipe?id=" + v)
      )
    );
  
    return { col_res, frame_res, lit_res, recipe_res, frame_info_res };
  }