import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Papa from "papaparse";
import multer, { Multer } from "multer";

import { WorkflowSchema } from "../schemas";

const workflowSchema = WorkflowSchema;
const upload: Multer = multer();

const WorkflowModel = mongoose.model("Workflow", workflowSchema);

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const workflows = await WorkflowModel.find();

  res.send(workflows.map((flow) => flow._id));
});

// Endpoint for saving workflows
router.post("/", async (req: Request, res: Response) => {
  const { flow } = req.body;

  const newWorkFlow = new WorkflowModel(flow);
  const result = await newWorkFlow.save();

  res.send("saved document");
});

const formatData = (file: Express.Multer.File | undefined) => {
  const csvFile = file ? file.buffer.toString("utf-8") : "";
  const { data } = Papa.parse(csvFile);
  const typedData = data as string[][];
  for (let i = 1; i < typedData.length; i++) {
    typedData[i][0] = typedData[i][0].toLowerCase();
  }
  return typedData;
};

const addDelay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const csvToJson = (csv: string[][] | undefined) => {
  const typedCsv = csv as string[][];
  const json = Papa.unparse(typedCsv);
  return json;
};

const sendPost = (json: string | undefined) => {
  console.log("sending post request...");
  fetch("https://techhstaxassessment.requestcatcher.com/test", {
    method: "POST",
    body: JSON.stringify(json),
  }).then((res) => console.log(res));
};

router.post(
  "/run",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const file = req.file;
    const workflow = await WorkflowModel.findById(id);
    if (workflow) {
      let csv;
      let json;
      for (const node of workflow.nodes) {
        switch (node.type) {
          case "Filter Data":
            csv = formatData(file);
            break;
          case "Wait":
            await addDelay(3000).then(() => console.log("delayed for 3000 ms"));
            break;
          case "Convert Format":
            json = csvToJson(csv);
            break;
          case "Send POST Request":
            await sendPost(json);
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
