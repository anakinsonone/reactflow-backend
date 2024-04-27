import mongoose, { Document } from "mongoose";
import multer, { Multer } from "multer";
import Papa from "papaparse";

import { WorkflowSchema } from "../schemas";
import { postURL } from "../config";

const workflowSchema = WorkflowSchema;
const upload: Multer = multer();

const WorkflowModel = mongoose.model("Workflow", workflowSchema);

export const formatData = (file: Express.Multer.File | undefined) => {
  const csvFile = file ? file.buffer.toString("utf-8") : "";
  const { data } = Papa.parse(csvFile);
  const typedData = data as string[][];
  for (let i = 1; i < typedData.length; i++) {
    typedData[i][0] = typedData[i][0].toLowerCase();
  }
  return typedData;
};

export const addDelay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const csvToJson = (csv: string[][] | undefined) => {
  const typedCsv = csv as string[][];
  const json = Papa.unparse(typedCsv);
  return json;
};

export const sendPost = (json: string | undefined) => {
  console.log("sending post request...");
  fetch(postURL, {
    method: "POST",
    body: JSON.stringify(json),
  }).then((res) => console.log(res));
};

export const executeWorkflow = async (
  id: any,
  file: Express.Multer.File | undefined,
) => {
  const workflow = await WorkflowModel.findById(id);
  let csv;
  let json;
  if (workflow) {
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
  return "executed workflow";
};
