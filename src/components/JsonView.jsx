import React from "react";
import { JSONTree } from "react-json-tree";

const customTheme = {
  // scheme: 'google',
  // author: 'seth wright (http://sethawright.com)',
  base00: "#1d1f21",
  base01: "#282a2e",
  base02: "#373b41",
  base03: "#969896",
  base04: "#b4b7b4",
  base05: "#c5c8c6",
  base06: "#e0e0e0",
  base07: "#ffffff",
  base08: "#CC342B",
  base09: "#F96A38",
  base0A: "#FBA922",
  base0B: "#42e3ff",
  base0C: "#3971ED",
  base0D: "#276bfe",
  base0E: "#A36AC7",
  base0F: "#3971ED",
};

export default function JsonView({ data, keyPath }) {
  return (
    <JSONTree
      // hideRoot
      data={data}
      labelRenderer={([key]) => <strong>{key}</strong>}
      valueRenderer={(raw) => <em>{raw}</em>}
      keyPath={[keyPath]}
      collectionLimit={20}
      theme={{
        extend: { ...customTheme },
        valueLabel: {
          textDecoration: "underline",
        },
        nestedNodeLabel: ({ style }, keyPath, nodeType, expanded) => ({
          style: {
            ...style,
            color: expanded ? "white" : style.color,
          },
        }),
      }}
    />
  );
}
