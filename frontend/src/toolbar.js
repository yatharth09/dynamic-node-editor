import { DraggableNode } from "./draggableNode";
import { SubmitButton } from "./submit";

export const PipelineToolbar = () => {
  const nodeLabels = {
    customInput: "Input",
    customOutput: "Output",
    text: "Text",
    llm: "LLM",
    calculator: "Calculator",
    filter: "Filter",
    database: "Database",
    transform: "Transform",
    condition: "Condition",
  };

  const nodes = [
    "customInput",
    "customOutput",
    "text",
    "llm",
    "calculator",
    "filter",
    "database",
    "transform",
    "condition",
  ];

  return (
    <header className="bg-transparent">
      <div className="max-w-full mx-auto px-4 py-2">
        <h1
          className="
    text-3xl font-bold 
    bg-white 
    bg-clip-text text-transparent
    drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]
    tracking-tight
    transition-all duration-300
    hover:drop-shadow-[0_2px_6px_rgba(16,185,129,0.4)]
  "
        >
          Pipeline Builder
        </h1>

        <div className="flex flex-wrap justify-between items-center mt-2">
          <div className="flex flex-wrap gap-3">
            {nodes.map((nodeType) => (
              <DraggableNode
                key={nodeType}
                type={nodeType}
                label={nodeLabels[nodeType]}
              />
            ))}
          </div>

          <SubmitButton />
        </div>
      </div>
    </header>
  );
};
