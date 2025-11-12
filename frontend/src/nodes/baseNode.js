import { useState, useMemo } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

export const BaseNode = ({
  id,
  data,
  title,
  fields = [],
  handles = [],
  children = null,
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const edges = useStore((state) => state.edges);

  const handleDelete = (e) => {
    e.stopPropagation();

    onNodesChange([{ type: "remove", id }]);

    const connectedEdges = edges.filter(
      (edge) => edge.source === id,
    );
    if (connectedEdges.length > 0) {
      onEdgesChange(
        connectedEdges.map((edge) => ({ type: "remove", id: edge.id })),
      );
    }
  };

  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach((field) => {
      const dataKey = field.dataKey || field.name;
      initialValues[field.name] = data?.[dataKey] || field.defaultValue || "";
    });
    return initialValues;
  });

  const detectedVariables = useMemo(() => {
    const variables = new Set();
    const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;

    fields.forEach((field) => {
      if (field.type === "text") {
        const fieldValue = fieldValues[field.name] || "";
        let match;
        while ((match = variableRegex.exec(fieldValue)) !== null) {
          variables.add(match[1]);
        }
      }
    });

    return Array.from(variables);
  }, [fieldValues, fields]);

  const dynamicHandles = useMemo(() => {
    const staticSourceHandles = handles.filter((h) => h.type === "source");

    const variableHandles = detectedVariables.map((variable, index) => ({
      type: "source",
      position: "left",
      id: `${id}-var-${variable}`,
      variable: variable,
      top:
        staticSourceHandles.length > 0
          ? 50 + index * (40 / Math.max(1, detectedVariables.length))
          : (index + 1) * (100 / (detectedVariables.length + 1)),
    }));

    return {
      source: [...staticSourceHandles, ...variableHandles],
    };
  }, [handles, detectedVariables, id]);

  const handleFieldChange = (fieldName, value, dataKey) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    updateNodeField(id, dataKey, value);
  };

  return (
    <div
      className="
        relative flex flex-col gap-2 p-4
        w-[220px] min-h-[100px]
        bg-gradient-to-b from-white to-slate-50
        border border-slate-200/70
        rounded-xl shadow-sm hover:shadow-lg
        transition-all duration-300 ease-in-out
        hover:-translate-y-[2px] hover:border-blue-400/60
        cursor-grab active:cursor-grabbing
      "
    >
      <button
        onClick={handleDelete}
        title="Delete node"
        aria-label="Delete node"
        className="
          absolute -top-1.5 -right-1.5
          flex items-center justify-center
          w-4 h-4 rounded-full
          bg-gradient-to-r from-red-500 to-rose-600
          text-white text-sm font-bold leading-none
          shadow-md shadow-red-400/30
          hover:from-red-600 hover:to-rose-700
          hover:shadow-lg hover:shadow-red-500/40
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-red-300/60
          backdrop-blur-sm border border-white/20
          transition-all duration-200
        "
      >
        <span className="translate-y-[-1.5px]">×</span>
      </button>

      <div className="flex flex-col gap-3">
        {title && (
          <div className="font-semibold text-sm text-slate-800 flex justify-between items-center border-b border-slate-200/70 pb-2">
            <span className="truncate">{title}</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {fields.map((field) => {
            const dataKey = field.dataKey || field.name;
            return (
              <label key={field.name} className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-600">
                  {field.label || field.name}
                </span>
                {field.type === "select" ? (
                  <select
                    value={fieldValues[field.name] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value, dataKey)
                    }
                    className="
                      p-2 rounded-md text-xs border border-slate-300/80
                      bg-white/90 focus:bg-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-all duration-150
                    "
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label || option.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <textarea
                    value={fieldValues[field.name] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value, dataKey)
                    }
                    className="
                      p-2 text-xs border border-slate-300/80 rounded-md
                      bg-white/90 focus:bg-white
                      resize-none overflow-hidden w-full
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-all duration-150
                    "
                    rows={1}
                    style={{
                      minHeight: "32px",
                      height: "auto",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      const scrollHeight = e.target.scrollHeight;
                      e.target.style.height =
                        Math.min(scrollHeight, 300) + "px";
                    }}
                  />
                )}
              </label>
            );
          })}
        </div>

        {children}

        {detectedVariables.length > 0 && (
          <div className="text-[10px] text-slate-600 mt-2 bg-blue-50 border border-blue-200 rounded-md px-2 py-1">
            <span className="font-semibold text-blue-700">Variables:</span>{" "}
            {detectedVariables.join(", ")}
          </div>
        )}
      </div>

      {dynamicHandles.source.map((handle, index) => {
        const handleId = handle.id || `${id}-output-${index}`;
        return (
          <Handle
            key={`source-${handleId}`}
            type="source"
            position={
              handle.position === "left" ? Position.Left : Position.Right
            }
            isConnectable
            id={handleId}
            style={{
              pointerEvents: "all",
              zIndex: 100,
              background: "#4f46e5",
              ...(
                handle.style || (handle.top ? { top: `${handle.top}%` } : {})
              )
            }}
          />
        );
      })}
    </div>
  );
};
