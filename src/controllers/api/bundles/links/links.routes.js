import { Router } from "express";
import addController from "./add.controller.js";
import updateController from "./update.controller.js";
import deleteController from "./delete.controller.js";

const router = Router();

router.post("/:slug/links/add", addController);
router.post("/:slug/links/update/:id", updateController);
router.post("/:slug/links/delete/:id", deleteController);

export default router;
