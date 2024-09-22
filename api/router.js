import express from "express";
import { registerUser } from "./controllers/controller.js";

export const api_route = express.Router();

api_route.post("/register", registerUser);

export default api_route;
