import { connect } from "@/dbconfig/dbCofign";
import { NextRequest, NextResponse } from "next/server";
import Problems from "@/models/problemModel";
import { useRowSelect } from "react-table";
import User from "@/models/userModel";
connect();
export async function GET(request: NextRequest, { params }: any) {
  try {
    console.log("in user solved problems");

    const id = params.id;
    console.log(id);

    const userSolved = await User.findOne({ _id: id }, "solvedProblems");
    console.log(userSolved);
    return NextResponse.json({
      message: "Fetched Solved Problems",
      userSolved,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong in solved problem fetching",
    });
  }
}
