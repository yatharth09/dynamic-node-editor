import { BaseNode } from "./baseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={[
        {
          type: "source",
          position: "left",
          id: `${id}-system`,
          top: 33.33,
        },
        {
          type: "source",
          position: "left",
          id: `${id}-prompt`,
          top: 66.67,
        },
        {
          type: "source",
          position: "right",
          id: `${id}-response`,
        },
      ]}
    >
      <div className="text-xs text-slate-500 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md p-2 border border-purple-200">
        <span className="font-medium text-purple-700">LLM Model</span>
      </div>
    </BaseNode>
  );
};
