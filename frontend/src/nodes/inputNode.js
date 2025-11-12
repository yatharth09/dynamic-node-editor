import { BaseNode } from "./baseNode";

export const InputNode = ({ id, data }) => {
  const defaultName = data?.inputName || id.replace("customInput-", "input_");

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={[
        {
          name: "inputName",
          label: "Name",
          type: "text",
          defaultValue: defaultName,
          dataKey: "inputName",
        },
        {
          name: "inputType",
          label: "Type",
          type: "select",
          defaultValue: data?.inputType || "Text",
          dataKey: "inputType",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ],
        },
      ]}
      handles={[
        {
          type: "source",
          position: "right",
          id: `${id}-value`,
        },
      ]}
    />
  );
};
