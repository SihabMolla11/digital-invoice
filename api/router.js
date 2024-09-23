import express from "express";
import { createOrder, getAllOrder } from "./controllers/controller.js";

export const api_route = express.Router();

api_route.post("/create-order", createOrder);
api_route.get("/all-order-for-admin", getAllOrder);

export default api_route;
