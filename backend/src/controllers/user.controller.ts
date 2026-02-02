import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { getCurrentUserService } from "../services/user.service";

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!req.user) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[debug] getCurrentUser: no user in request. session present:", !!req.session);
        console.log("[debug] request cookies:", req.cookies);
      }
    }

    const { user } = await getCurrentUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User fetch successfully",
      user,
    });
  }
);
