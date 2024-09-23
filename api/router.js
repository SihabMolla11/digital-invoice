import express from "express";
import { createOrder, getAllOrder, getAllStore, getDueAmountForStore } from "./controllers/controller.js";

export const api_route = express.Router();

api_route.post("/create-order", createOrder);
api_route.get("/all-order-for-admin", getAllOrder);
api_route.get("/all-due-amount-for-store", getDueAmountForStore);
api_route.get("/all-store", getAllStore);

export default api_route;
