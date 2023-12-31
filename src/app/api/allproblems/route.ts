import { connect } from "@/dbconfig/dbCofign";
import { NextRequest, NextResponse } from "next/server";
import Problems from "@/models/problemModel";
import { useRowSelect } from "react-table";
import User from "@/models/userModel";
connect();
export async function GET(request: NextRequest) {
  try {
    const problems = await Problems.find(
      {},
      "problem_title _id problem_difficulty"
    );

    return NextResponse.json({
      message: "Fetched Problems",
      problems,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong in problem fetching",
    });
  }
}
