import { BaseNode } from "./baseNode";

export const OutputNode = ({ id, data }) => {
  const defaultName =
    data?.outputName || id.replace("customOutput-", "output_");

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={[
        {
          name: "outputName",
          label: "Name",
          type: "text",
          defaultValue: defaultName,
          dataKey: "outputName",
        },
        {
          name: "outputType",
          label: "Type",
          type: "select",
          defaultValue: data?.outputType || "Text",
          dataKey: "outputType",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "Image" },
          ],
        },
      ]}
      handles={[
        {
          type: "source",
          position: "left",
          id: `${id}-value`,
        },
      ]}
    />
  );
};
