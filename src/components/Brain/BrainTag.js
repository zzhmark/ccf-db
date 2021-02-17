import React from "react";
import Button from "components/CustomButtons/Button";

export default function BrainTag(props) {
  const { color, name } = props;
  return (
    <Button
      style={{
        backgroundColor: color,
        color: "black",
        borderColor: color,
        boxShadow: "none",
        textTransform: "none",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 16,
      }}
      disableElevation
      disableRipple
      size="small"
    >
      {name}
    </Button>
  );
}
