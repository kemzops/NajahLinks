import { Router } from "express";
import loginController from "./login.controller.js";
import registerController from "./register.controller.js";
import logoutController from "./logout.controller.js";
import verifyController from "./verify.controller.js";
import { redirectIfAuthenticated } from "../../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", redirectIfAuthenticated, loginController);
router.post("/register", redirectIfAuthenticated, registerController);

router.get("/verify/:verificationToken", verifyController);

router.post("/logout", logoutController);

export default router;
