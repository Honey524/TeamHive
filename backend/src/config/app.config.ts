import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "8000"), // Updated to match your .env
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", "mongodb://localhost:27017/teamsync_db"),

  SESSION_SECRET: getEnv("SESSION_SECRET", "dev-session-secret-change-in-prod"), // Added: Dev default
  SESSION_EXPIRES_IN: getEnv("SESSION_EXPIRES_IN", "1d"), // Added: Dev default

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"), // Updated to match .env
  // Removed: All Google vars (no auth needed)
});

export const config = appConfig();