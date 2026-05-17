import { Router } from "express";
import authRoutes from "../controllers/api/auth/auth.routes.js";
import bundleRoutes from "../controllers/api/bundles/bundles.routes.js";

const router = Router();

/**
 * Health check (useful for deployment + monitoring)
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

router.use("/auth", authRoutes);
router.use("/bundles", bundleRoutes);

export default router;
