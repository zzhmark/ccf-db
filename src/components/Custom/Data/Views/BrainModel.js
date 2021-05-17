import React from "react";
import BrainLoader from "../../Brain/BrainLoader";

function map_color(colormap, score, l, r) {
  const hexToRGB = (hex) => {
    let r = 0,
      g = 0,
      b = 0;
    // handling 3 digit hex
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
      // handling 6 digit hex
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }

    return {
      r: +r,
      g: +g,
      b: +b,
    };
  };
  const colors = colormap.split("-").map(hexToRGB);
  const ratio = (score - l) / (r - l);
  const norm = ratio * (colors.length - 1);
  const [color_a, color_b] = colors.slice(
    ratio === 1 ? colors.length - 2 : Math.floor(norm),
    ratio === 1 ? colors.length : Math.floor(norm) + 2
  );
  const delta = ratio === 1 ? 1 : norm - Math.floor(norm);
  const color_out = {
    r: (color_b.r - color_a.r) * delta + color_a.r,
    g: (color_b.g - color_a.g) * delta + color_a.g,
    b: (color_b.b - color_a.b) * delta + color_a.b,
  };
  return "rgb(" + Object.values(color_out).map(Math.trunc).join(",") + ")";
}

export default function BrainModel({ data, mapping, colormap, viewer }) {
  const { brain, score } = mapping;
  const { load, visible } = viewer;
  const { l, r } = data
    .map((v) => v[score])
    .reduce((a, b) => ({ l: Math.min(a.l, b), r: Math.max(a.r, b) }), {
      l: Infinity,
      r: -Infinity,
    });
  return (
    <group>
      {brain.map((col) =>
        data.map((v, i) => {
          return (
            load[i] && (
              <BrainLoader
                key={i}
                id={v[col]}
                color={map_color(colormap, v[score], l, r)}
                visible={visible[i]}
                opacity={0.1}
                roughness={0.8}
                transparent={true}
                metalness={0.5}
              />
            )
          );
        })
      )}
    </group>
  );
}
