import React from "react";
import { JSONTree } from "react-json-tree";

export default function JsonView({ data, keyPath }) {
  return (
    <JSONTree
      // hideRoot
      data={data}
      labelRenderer={([key]) => <strong>{key}</strong>}
      valueRenderer={(raw) => <em>{raw}</em>}
      keyPath={[keyPath]}
      theme={{
        extend: "google",
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
