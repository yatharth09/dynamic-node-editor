import { Popup } from "./components/popup-modal";
import { useStore } from "./store";
import { useState } from "react";

export const SubmitButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfNodes, setNumberOfNodes] = useState(0);
  const [connections, setConnections] = useState(0);
  const [isValidGraph, setIsValidGraph] = useState(false);
  const [loading, setLoading] = useState(false);

  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formattedEdges = edges.map((edge) => [edge.source, edge.target]);
      const nodeIds = nodes.map((node) => node.id);

      console.log(nodeIds, formattedEdges);

      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodes: nodeIds,
          edges: formattedEdges,
        }),
      });

      if (!response.ok) throw new Error("Failed to process pipeline");

      const data = await response.json();
      setShowModal(true);
      setNumberOfNodes(data.num_nodes);
      setConnections(data.num_edges);
      setIsValidGraph(data.is_valid_dag);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("Something went wrong while validating the pipeline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`
          relative group 
          px-8 py-3 
          text-white font-semibold 
          rounded-xl
          transition-all duration-300
          bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-700

          shadow-[0_0_15px_rgba(59,130,246,0.5)]
          hover:shadow-[0_0_25px_rgba(99,102,241,0.8)]
          hover:scale-[1.05] active:scale-95
          focus:outline-none focus:ring-4 focus:ring-blue-300/50
          disabled:opacity-60 disabled:cursor-not-allowed
          overflow-hidden
        `}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></span>
        <span className="relative flex items-center gap-2 z-10">
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Submit Pipeline"
          )}
        </span>
      </button>

      {showModal && (
        <Popup
          numberOfNodes={numberOfNodes}
          connections={connections}
          isValidGraph={isValidGraph}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};
