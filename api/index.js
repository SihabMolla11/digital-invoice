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
    origin: "https://incomparable-lollipop-486a06.netlify.app/",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("!the project is running");
});

app.use("/api", api_route);

app.listen(() => {
  connectWithDatabase(db_url);
  console.log("server is running on", port);
});
