import { BaseNode } from "./baseNode";

export const ConditionNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      fields={[
        {
          name: "condition",
          label: "Condition",
          type: "text",
          defaultValue: data?.condition || "value > 0",
          dataKey: "condition",
        },
        {
          name: "operator",
          label: "Operator",
          type: "select",
          defaultValue: data?.operator || "greaterThan",
          dataKey: "operator",
          options: [
            { value: "greaterThan", label: "Greater Than (>)" },
            { value: "lessThan", label: "Less Than (<)" },
            { value: "equals", label: "Equals (=)" },
            { value: "notEquals", label: "Not Equals (≠)" },
            { value: "contains", label: "Contains" },
            { value: "regex", label: "Regex Match" },
          ],
        },
      ]}
      handles={[
        {
          type: "source",
          position: "left",
          id: `${id}-input`,
          top: 25,
        },
        {
          type: "source",
          position: "right",
          id: `${id}-true`,
          top: 25,
        },
        {
          type: "source",
          position: "right",
          id: `${id}-false`,
          top: 75,
        },
      ]}
      className="min-h-[120px]"
    >
      <div className="text-[10px] mt-2 text-slate-500 bg-slate-50 rounded-md p-2 border border-slate-200">
        <div className="font-medium text-slate-700 mb-1">Outputs:</div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            True → Top
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            False → Bottom
          </span>
        </div>
      </div>
    </BaseNode>
  );
};
