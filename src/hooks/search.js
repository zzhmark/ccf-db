import create from "zustand";
import produce from "immer";

const useSearch = create((set) => ({
  content: "",
  placeholder: "",
  reportId: 1,
  Chips:[],
  setChip: (label, func) =>
    set(
      produce((state) => {
         state.Chips.push({key:state.Chips.length})
      })
    ),
  delChip: (i) =>
    set(
      produce((state) => {
        state.reportId = i;
      })
    ),
  setReportId: (i) =>
    set(
      produce((state) => {
        state.reportId = i;
      })
    ),
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
    ),
}));

export default useSearch;
