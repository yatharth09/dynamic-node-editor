import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[
        {
          name: "text",
          label: "Text",
          type: "text",
          defaultValue: data?.text || "{{input}}",
          dataKey: "text",
        },
      ]}
      handles={[
        {
          type: "source",
          position: "right",
          id: `${id}-output`,
        },
      ]}
    />
  );
};
