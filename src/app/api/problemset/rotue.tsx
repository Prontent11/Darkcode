import Problems from "@/models/problemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const problems = await Problems.find({}, "_id problem_title");

    return NextResponse.json({
      message: "Problems fetched successfully",
      problems,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong while fetching problems",
    });
  }
}
