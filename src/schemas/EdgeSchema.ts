import mongoose from "mongoose";

export const EdgeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    description: "ID of the source node",
  },
  sourceHandle: {
    type: String,
    description: "Handle of the source node (if applicable)",
  },
  target: {
    type: String,
    required: true,
    description: "ID of the target node",
  },
  targetHandle: {
    type: String,
    description: "Handle of the target node (if applicable)",
  },
  markerEnd: {
    type: Object,
    description: "Marker configuration for the edge",
  },
  id: {
    type: String,
    required: true,
    description: "Unique identifier for the edge",
  },
});
