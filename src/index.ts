import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import mongoose from "mongoose";

import { MONGODB_CONNECTION_URI } from "./config";
import WorkflowRoutes from "./routes/WorkflowRoutes";

const app: Express = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to Mongo DB: ", error);
  }
};
connectDB();
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api/workflows", WorkflowRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
