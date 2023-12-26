import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbCofign";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User dosen't exists",
        },
        {
          status: 400,
        }
      );
    }
    console.log("User exists");
    const validUser = await bcryptjs.compare(password, user.password);

    if (!validUser) {
      return NextResponse.json(
        {
          error: "Invalid Password",
        },
        {
          status: 400,
        }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Logged In successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log("Error from signup", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
