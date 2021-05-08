import ScheduleIcon from "@material-ui/icons/Schedule";
import MemoryIcon from "@material-ui/icons/Memory";

const searchFilter = [
  { title: "Publish Date", type: "range[]", field: "date", icon: ScheduleIcon },
  {
    title: "Assay Type",
    type: "cat",
    field: "assay_type",
    icon: MemoryIcon,
    values: ["electrophysiology", "calcium imaging"],
  },
];

export default searchFilter;
