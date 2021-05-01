import create from "zustand";
import produce from "immer";

const useSearch = create((set) => ({
  content: "",
  placeholder: "",
  setContent: (str) =>
    set(
      produce((state) => {
        state.content = str;
      })
    ),
  setPlaceholder: (str) =>
    set(
      produce((state) => {
        state.placeholder = str;
      })
    )
}));

export default useSearch;
