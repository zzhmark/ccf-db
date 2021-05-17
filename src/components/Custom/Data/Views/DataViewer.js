import BrainModel from "./BrainModel.js";

export default function DataViewer({ type, visible, ...rest }) {
  switch (type) {
    case "PSTH":
      // switch (viewer.mode) {
      //   case "brain":
      return visible && BrainModel(rest);
    // }
  }
}
