// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

// Helper to generate unique edge ID
const generateEdgeId = (source, target, sourceHandle, targetHandle) => {
  return `${source}-${sourceHandle || "default"}-${target}-${targetHandle || "default"}`;
};

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    // Ensure edge has an ID
    const edgeId =
      connection.id ||
      generateEdgeId(
        connection.source,
        connection.target,
        connection.sourceHandle,
        connection.targetHandle,
      );

    const newEdge = addEdge(
      {
        ...connection,
        id: edgeId,
        type: "smoothstep",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: {
          strokeWidth: 3,
          stroke: "#6366f1",
        },
      },
      get().edges,
    );

    set({
      edges: newEdge,
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
}));
