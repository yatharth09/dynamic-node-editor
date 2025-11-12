import { BaseNode } from "./baseNode";

export const CalculatorNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Calculator"
      fields={[
        {
          name: "operation",
          label: "Operation",
          type: "select",
          defaultValue: data?.operation || "add",
          dataKey: "operation",
          options: [
            { value: "add", label: "Add (+)" },
            { value: "subtract", label: "Subtract (-)" },
            { value: "multiply", label: "Multiply (×)" },
            { value: "divide", label: "Divide (÷)" },
          ],
        },
        {
          name: "value",
          label: "Constant Value",
          type: "text",
          defaultValue: data?.value || "0",
          dataKey: "value",
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
          id: `${id}-result`,
        },
      ]}
    />
  );
};
