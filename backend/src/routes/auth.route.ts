import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import {
  // googleLoginCallback, // Removed: Google Auth
  loginController,
  logOutController,
  registerUserController,
} from "../controllers/auth.controller";

// const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`; // Removed: Google-specific

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);

authRoutes.post("/logout", logOutController);

// Removed: Google routes
// authRoutes.get("/google", ...);
// authRoutes.get("/google/callback", ...);

export default authRoutes;