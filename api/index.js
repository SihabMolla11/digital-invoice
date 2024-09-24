import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectWithDatabase } from "./db.js";
import api_route from "./router.js";

const corsConfig = {
  origin: ".",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const db_url = process.env.DB_URL;

// app.options("", cors(corsConfig));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("!the project is running");
});

app.use("/api", api_route);

app.listen(port, () => {
  connectWithDatabase(db_url);
  console.log("server is running on", port);
});
