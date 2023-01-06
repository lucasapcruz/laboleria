import { Router } from "express";
import { createTypeOfCake } from "../controllers/cakes.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { cakesSchema } from "../models/cakes.schema.js";

const cakesRoute = Router();

cakesRoute.post("/cakes", schemaValidation(cakesSchema), createTypeOfCake)

export default cakesRoute;
