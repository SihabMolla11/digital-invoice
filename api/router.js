import express from "express";
import { createOrder } from "./controllers/controller.js";

export const api_route = express.Router();

api_route.post("/create-order", createOrder);

export default api_route;
