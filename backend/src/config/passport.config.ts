import passport from "passport";
import { Request } from "express";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Removed: Google Auth
import { Strategy as LocalStrategy } from "passport-local";

// import { config } from "./app.config"; // Uncomment if needed elsewhere; removed Google uses
import { NotFoundException } from "../utils/appError";
import { ProviderEnum } from "../enums/account-provider.enum";
import {
  loginOrCreateAccountService,
  verifyUserService,
} from "../services/auth.service";

// Removed: Entire GoogleStrategy block (passport.use(new GoogleStrategy(...)))

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
    },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });
        return done(null, user);
      } catch (error: any) {
        return done(error, false, { message: error?.message });
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));