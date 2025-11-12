export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeColors = {
    customInput: "from-emerald-500 to-teal-600",
    customOutput: "from-emerald-500 to-teal-600",
    text: "from-emerald-500 to-teal-600",
    llm: "from-blue-500 to-cyan-600",
    calculator: "from-blue-500 to-cyan-600",
    filter: "from-blue-500 to-cyan-600",
    database: "from-orange-500 to-red-600",
    transform: "from-orange-500 to-red-600",
    condition: "from-orange-500 to-red-600",
  };

  const gradientClass = nodeColors[type] || "from-slate-500 to-slate-700";

  return (
    <div
      className={`
        cursor-grab active:cursor-grabbing
        w-[87px] h-[35px]
        flex items-center justify-center
        rounded-md
        bg-gradient-to-br ${gradientClass}
        text-white font-medium text-sm
        shadow-md hover:shadow-lg
        transform hover:scale-105 active:scale-95
        transition-all duration-200
        border border-white/20
        px-4
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <span className="text-white font-medium">{label}</span>
    </div>
  );
};
