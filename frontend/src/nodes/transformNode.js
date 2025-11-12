import { BaseNode } from "./baseNode";

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      fields={[
        {
          name: "transformType",
          label: "Transform Type",
          type: "select",
          defaultValue: data?.transformType || "uppercase",
          dataKey: "transformType",
          options: [
            { value: "uppercase", label: "Uppercase" },
            { value: "lowercase", label: "Lowercase" },
            { value: "reverse", label: "Reverse" },
            { value: "trim", label: "Trim Whitespace" },
            { value: "replace", label: "Replace Text" },
            { value: "extract", label: "Extract Pattern" },
          ],
        },
        {
          name: "transformValue",
          label: "Transform Value",
          type: "text",
          defaultValue: data?.transformValue || "",
          dataKey: "transformValue",
        },
      ]}
      handles={[
        {
          type: "source",
          position: "left",
          id: `${id}-input`,
        },
        {
          type: "source",
          position: "right",
          id: `${id}-transformed`,
        },
      ]}
    />
  );
};
