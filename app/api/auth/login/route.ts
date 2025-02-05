import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use environment variables in production

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required ~ Vasu" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials ~ Vasu" },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials ~ Vasu" },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    return NextResponse.json(
      { message: "Login successful ~ Vasu", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error ~ Vasu:", error);
    return NextResponse.json(
      { error: "Failed to login ~ Vasu" },
      { status: 500 }
    );
  }
}
