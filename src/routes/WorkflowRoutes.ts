import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Papa from "papaparse";
import multer, { Multer } from "multer";

import { WorkflowSchema } from "../schemas";

const workflowSchema = WorkflowSchema;
const upload: Multer = multer();

const Workflow = mongoose.model("Workflow", workflowSchema);

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const workflows = await Workflow.find();

  res.send(workflows.map((flow) => flow._id));
});

// Endpoint for saving workflows
router.post("/", async (req: Request, res: Response) => {
  const { flow } = req.body;

  const newWorkFlow = new Workflow(flow);
  const result = await newWorkFlow.save();

  res.send("saved document");
});

const filterData = (file: Express.Multer.File | undefined) => {
  console.log(file);
};

router.post(
  "/run",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const file = req.file;
    const workflow = await Workflow.findById(id);
    if (workflow) {
      for (const node of workflow.nodes) {
        switch (node.type) {
          case "Start":
            break;
          case "Filter Data":
            filterData(file);
            break;
          default:
            break;
        }
      }
    }
    res.send(workflow);
  },
);

export default router;
