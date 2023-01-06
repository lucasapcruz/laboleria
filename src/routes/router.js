import { Router } from "express";
import cakesRoute from "./cakesRouter.js";
import clientsRouter from "./clientsRouter.js";
import ordersRouter from "./ordersRouter.js";

const router = Router();

router.use(cakesRoute);
router.use(clientsRouter);
router.use(ordersRouter);

export default router;
