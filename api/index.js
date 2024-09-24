import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectWithDatabase } from "./db.js";
import api_route from "./router.js";

dotenv.config();


const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("!bangal project is running");
});

app.use("/api", api_route);

export default async (req, res) => {
  await connectWithDatabase(db_url);
  app(req, res);
};
