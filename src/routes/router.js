import { Router } from "express";
import cakesRoute from "./cakesRouter.js";
import clientsRouter from "./clientsRouter.js";

const router = Router();

router.use(cakesRoute);
router.use(clientsRouter);

export default router;
