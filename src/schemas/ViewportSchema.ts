import mongoose from "mongoose";

export const ViewportSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
    description: "X-coordinate of the viewport",
  },
  y: {
    type: Number,
    required: true,
    description: "Y-coordinate of the viewport",
  },
  zoom: {
    type: Number,
    required: true,
    description: "Zoom level of the viewport",
  },
});
