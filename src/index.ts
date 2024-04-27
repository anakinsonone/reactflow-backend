import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import multer, { Multer } from "multer";

import { MONGODB_CONNECTION_URI } from "./config";
import { WorkflowSchema } from "./schemas/index";

dotenv.config();

const app: Express = express();
const upload: Multer = multer();
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

const workflowSchema = WorkflowSchema;

const Workflow = mongoose.model("Workflow", workflowSchema);

app.get("/api/workflows", async (req: Request, res: Response) => {
  const workflows = await Workflow.find();

  res.send(workflows.map((flow) => flow._id));
});

// Endpoint for saving workflows
app.post("/api/workflows", async (req: Request, res: Response) => {
  const { flow } = req.body;

  const newWorkFlow = new Workflow(flow);
  const result = await newWorkFlow.save();

  res.send("saved document");
});

app.post(
  "/api/workflows/run",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const file = req.file;
    const workflow = await Workflow.findById(id);
    if (workflow) {
      for (const node of workflow.nodes) {
        console.log(node.type);
      }
    }
    res.send(workflow);
  },
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
