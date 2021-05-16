import create from "zustand";
import produce from "immer";

const useSearch = create((set) => ({
  content: "",
  advancedContent: [["", ""]],
  placeholder: "example",
  reportId: null,
  chips: [],
  results: [],
  clearAdvancedContent: () =>
    set(
      produce((state) => {
        state.advancedContent = [["", ""]];
        return state;
      })
    ),
  addAdvancedContent: (field, content) =>
    set(
      produce((state) => {
        state.advancedContent.push([field, content]);
      })
    ),
  setAdvancedContent: (i, field, content) =>
    set(
      produce((state) => {
        state.advancedContent[i] = [field, content];
      })
    ),
  delAdvancedContent: (i) =>
    set(
      produce((state) => {
        state.advancedContent.splice(i, 1);
        return state;
      })
    ),
  setResults: (re) =>
    set(
      produce((state) => {
        state.results = re;
      })
    ),
  addChip: (title, type, field, value) => {
    switch (type) {
      case "range[]":
        set(
          produce((state) => {
            state.chips.push({
              color: "primary",
              label: title + ": from " + value.gte + " to " + value.lse,
              func: (e) =>
                e["_source"][field] >= value.gte &&
                e["_source"][field] <= value.lse,
            });
            return state;
          })
        );
        break;
      case "cat":
        set(
          produce((state) => {
            const valueList = Object.keys(value).filter((v) => value[v]);
            state.chips.push({
              color: "secondary",
              label: title + ": " + valueList,
              func: (e) => valueList.includes(e["_source"][field]),
            });
            return state;
          })
        );
        break;
    }
  },
  delChip: (i) =>
    set(
      produce((state) => {
        state.chips.splice(i, 1);
        return state;
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
