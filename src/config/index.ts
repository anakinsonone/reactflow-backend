import { config } from "dotenv";
config();

const password = process.env.MONGODB_PASSWORD;
export const MONGODB_CONNECTION_URI = `mongodb+srv://akkhisonone:${password}@cluster0.pbh4iqx.mongodb.net/`;
