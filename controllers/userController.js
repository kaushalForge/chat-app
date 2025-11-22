import { NextResponse } from "next/server";
import dbConnection from "@/lib/dbConnection";
import User from "@/models/User";
import { hashPassword, comparePassword } from "@/utils/hashPassword";
import { genToken } from "@/utils/generateToken";
import { uploadToCloudinary } from "@/lib/cloudinary";

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
      password: await hashPassword(password),
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

    // STEP 1 — get user WITH email
    const user = await User.findOne({ email: email });

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

export const updateUser = async (req, user) => {
  try {
    await dbConnection();

    const form = await req.formData();
    const oldPassword = form.get("oldPassword");
    const newPassword = form.get("newPassword");
    const email = form.get("email");
    const file = form.get("profilePicture");

    if (!oldPassword) {
      return NextResponse.json(
        { message: "Old password is required!" },
        { status: 400 }
      );
    }

    // Check if old password matches
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // Prevent new password = old password
    if (newPassword && (await comparePassword(newPassword, user.password))) {
      return NextResponse.json(
        { message: "New password cannot be same as old password!" },
        { status: 400 }
      );
    }

    // Check if profile picture is same
    let isProfileSame = true;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

      // Compare base64 of old image (if exists) with new image
      if (user.profilePicture) {
        // Extract old public URL as base64 placeholder if you store it
        // Here we assume direct comparison is not feasible, so we will update anyway
        isProfileSame = false; // assume different if user uploads new file
      } else {
        isProfileSame = false; // new image uploaded
      }
    }

    // Check if email same
    const isEmailSame = email === user.email;
    const isPasswordSame = !newPassword; // if no new password, same

    if (isEmailSame && isPasswordSame && isProfileSame) {
      return NextResponse.json(
        { message: "No changes detected!" },
        { status: 200 }
      );
    }

    // Update email
    if (!isEmailSame) user.email = email;

    // Update password
    if (newPassword) {
      user.password = await hashPassword(newPassword);
    }

    // Update profile picture
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

      let oldPublicId;
      if (user.profilePicture) {
        const urlParts = user.profilePicture.split("/");
        const fileNameWithExt = urlParts.pop();
        const fileName = fileNameWithExt.split(".")[0];
        const folderPath = urlParts.slice(-2).join("/");
        oldPublicId = `${folderPath}/${fileName}`;
      }

      const cloudUpload = await uploadToCloudinary(
        oldPublicId,
        dataUri,
        "Kurakani/profilePictures"
      );

      user.profilePicture = cloudUpload.secure_url;
    }

    await user.save();

    const { password, ...safeUser } = user.toObject();
    return NextResponse.json(
      { message: "Account Updated!", user: safeUser },
      { status: 200 }
    );
  } catch (err) {
    console.error("User update error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
