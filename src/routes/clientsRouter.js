import { Router } from "express";
import { createClient, getClientOrders } from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/schemaValidation.middleware.js";
import { clientsSchema } from "../models/clients.schema.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateSchema(clientsSchema), createClient);
clientsRouter.get("/clients/:id/orders", getClientOrders);

export default clientsRouter;
