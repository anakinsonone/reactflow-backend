import mongoose from "mongoose";

import { EdgeSchema, NodeSchema, ViewportSchema } from "./index";

export const WorkflowSchema = new mongoose.Schema({
  nodes: {
    type: [NodeSchema],
    required: true,
    description: "Array of nodes in the workflow",
  },
  edges: {
    type: [EdgeSchema],
    required: true,
    description: "Array of edges in the workflow",
  },
  viewport: {
    type: ViewportSchema,
    required: true,
    description: "Viewport configuration for the workflow",
  },
});
