import { Router } from "express";
import pagesRoutes from "../controllers/pages/pages.routes.js";
const router = Router();

router.use("/", pagesRoutes);

export default router;
