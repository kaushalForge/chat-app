import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import User from "@/models/User";
import { hashedPassword, comparePassword } from "@/utils/hashPassword";
import { genToken } from "@/utils/authorization";

export const signUpUser = async (req) => {
  try {
    await dbConnection();
    const body = await req.json();
    const { username, email, password } = body;
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { warning: "Password too short!" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User exists" }, { status: 409 });
    }

    const newUser = await User.create({
      username,
      email,
      password: await hashedPassword(password),
    });

    return NextResponse.json(
      { message: "Account created!", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("User creation error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const signInUser = async (req) => {
  try {
    await dbConnection();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required!" },
        { status: 400 }
      );
    }

    // STEP 1 — get user WITH password
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { warning: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // STEP 2 — compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { warning: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // STEP 3 — generate token
    const token = genToken({ email: user.email });

    // STEP 4 — remove password before sending
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json(
      {
        message: "Login successful!",
        token,
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Sign-in error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
