import HeatmapLine from "./HeatmapLine";

export default function DataChart({ type, ...rest }) {
  switch (type) {
    case "PSTH":
      return HeatmapLine(rest);
  }
}
