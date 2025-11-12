import React from "react";

export const Popup = ({
  numberOfNodes,
  connections,
  isValidGraph,
  setShowModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl transform transition-all scale-100 animate-slideUp">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
        >
          ×
        </button>

        <h3 className="text-2xl font-semibold text-center bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text mb-6">
          Graph Summary
        </h3>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Number of Nodes:</span>
            <span className="text-gray-800">{numberOfNodes}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Connections:</span>
            <span className="text-gray-800">{connections}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Valid DAG:</span>
            <span
              className={`${
                isValidGraph ? "text-green-600" : "text-red-600"
              } font-semibold`}
            >
              {isValidGraph ? "Yes ✅" : "No ❌"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
