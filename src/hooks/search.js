import create from "zustand";
import produce from "immer";

const useSearch = create((set) => ({
  content: "",
  placeholder: "",
  reportId: 1,
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
