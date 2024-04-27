import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import multer, { Multer } from "multer";
import Papa from "papaparse";

import { WorkflowSchema } from "../schemas";
import { executeWorkflow } from "../controllers";

const workflowSchema = WorkflowSchema;
const upload: Multer = multer();

const WorkflowModel = mongoose.model("Workflow", workflowSchema);

export const WorkflowRouter = Router();

WorkflowRouter.get("/", async (req: Request, res: Response) => {
  const workflows = await WorkflowModel.find();

  res.send(workflows.map((flow) => flow._id));
});

// Endpoint for saving workflows
WorkflowRouter.post("/", async (req: Request, res: Response) => {
  const { flow } = req.body;

  const newWorkFlow = new WorkflowModel(flow);
  const result = await newWorkFlow.save();

  res.send("saved document");
});

WorkflowRouter.post(
  "/run",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const file = req.file;
    const result = await executeWorkflow(id, file);

    res.send(result);
  },
);
