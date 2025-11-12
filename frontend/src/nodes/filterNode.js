import { BaseNode } from "./baseNode";

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      fields={[
        {
          name: "filterType",
          label: "Filter Type",
          type: "select",
          defaultValue: data?.filterType || "contains",
          dataKey: "filterType",
          options: [
            { value: "contains", label: "Contains" },
            { value: "equals", label: "Equals" },
            { value: "startsWith", label: "Starts With" },
            { value: "endsWith", label: "Ends With" },
            { value: "greaterThan", label: "Greater Than" },
            { value: "lessThan", label: "Less Than" },
          ],
        },
        {
          name: "filterValue",
          label: "Filter Value",
          type: "text",
          defaultValue: data?.filterValue || "",
          dataKey: "filterValue",
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
          id: `${id}-filtered`,
        },
      ]}
    />
  );
};
