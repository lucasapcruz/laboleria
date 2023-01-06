import { Router } from "express";
import { createOrder } from "../controllers/orders.controller.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { ordersSchema } from "../models/orders.schema.js";

const ordersRouter = Router();

ordersRouter.post("/orders", validateSchema(ordersSchema), createOrder);

export default ordersRouter;
