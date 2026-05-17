import { Router } from "express";
import {
  attachUser,
  redirectIfAuthenticated,
  requireAuthentication,
} from "../../middleware/auth.middleware.js";
import homeController from "./home.controller.js";
import authController from "./auth.controller.js";
import dashboardController from "./dashboard.controller.js";
import manageController from "./manage.controller.js";
import bundleController from "./bundle.controller.js";

const router = Router();

router.get("/", attachUser, homeController);

router.get("/auth", redirectIfAuthenticated, authController);

router.get("/dashboard", requireAuthentication, dashboardController);
router.get("/dashboard/manage/:slug", requireAuthentication, manageController);

router.get("/b/:slug", attachUser, bundleController);

// NOT IN THE MVP :(
//router.get("/error", errorController);
//router.get("/admin", requireAuthentication, adminController);

export default router;
