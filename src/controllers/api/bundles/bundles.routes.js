import { Router } from "express";
import { requireAuthentication } from "../../../middleware/auth.middleware.js";

import createController from "./create.controller.js";
import updateController from "./update.controller.js";
import deleteController from "./delete.controller.js";
import linkRoutes from "./links/links.routes.js";

const router = Router();

router.post("/create", requireAuthentication, createController);
router.post("/update/:slug", requireAuthentication, updateController);
router.post("/delete/:slug", requireAuthentication, deleteController);

// LINKS.ROUTES.JS REQUIRED :SLUG ACCESS (SO I USED / | RUSHED API DESIGN)
router.use("/", requireAuthentication, linkRoutes);

export default router;
