import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbCofign";
connect();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "users already exists",
        },
        {
          status: 400,
        }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    console.log("Signup" + savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log("Error from signup", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
