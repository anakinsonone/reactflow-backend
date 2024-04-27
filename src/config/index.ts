import { config } from "dotenv";
config();

const password = process.env.MONGODB_PASSWORD;
const username = process.env.MONGODB_USERNAME;

export const port = process.env.PORT;
export const MONGODB_CONNECTION_URI = `mongodb+srv://${username}:${password}@cluster0.pbh4iqx.mongodb.net/`;
export const postURL = `${process.env.POST_REQUEST_URL}`;
