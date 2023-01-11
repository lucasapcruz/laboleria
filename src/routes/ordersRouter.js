import { Router } from "express";
import { createOrder, getOrders, getOrdersById } from "../controllers/orders.controller.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { ordersSchema } from "../models/orders.schema.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateSchema(ordersSchema), createOrder);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrdersById);

export default ordersRouter;
