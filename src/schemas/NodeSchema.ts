import mongoose from "mongoose";

export const NodeSchema = new mongoose.Schema({
  width: {
    type: Number,
    required: true,
    description: "Width of the node",
  },
  height: {
    type: Number,
    required: true,
    description: "Height of the node",
  },
  id: {
    type: String,
    required: true,
    description: "Unique identifier for the node",
  },
  type: {
    type: String,
    required: true,
    description: "Type of the node",
  },
  position: {
    type: Object,
    required: true,
    description: "Position of the node within the viewport",
  },
  data: {
    type: Object,
    description: "Additional data associated with the node",
  },
  positionAbsolute: {
    type: Object,
    required: true,
    description: "Absolute position of the node",
  },
});
