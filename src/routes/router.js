import { Router } from "express";
import cakesRoute from "./cakesRouter.js";

const router = Router();

router.use(cakesRoute);

export default router;
