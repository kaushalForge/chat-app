import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";

/**
 * Higher-order function to protect routes
 * Usage: POST = isLoggedIn(async (req, user) => { ... })
 */
export const isLoggedIn = (handler) => {
  return async (req) => {
    try {
      // Get token from headers
      const token = req.headers.get("authorization");

      if (!token) {
        return NextResponse.json(
          { message: "You must be logged in!" },
          { status: 401 }
        );
      }
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return NextResponse.json(
          { message: "Unauthorized: User not found" },
          { status: 401 }
        );
      } else if (user) {
        return handler(req, user);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }
  };
};
