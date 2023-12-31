import Problems from "@/models/problemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const id = params.id;
    // const { id } = requestBody;
    if (!id) {
      return NextResponse.json({
        error: "Something went wrong in problem id fetching",
      });
    }
    const problem = await Problems.findOne({ _id: id });
    console.log(problem);

    return NextResponse.json({
      message: "Problem fetched successfully",
      status: 200,
      problem,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong in problem id fetching",
    });
  }
}
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = params.id;
    // const { id } = requestBody;
    if (!id) {
      return NextResponse.json({
        error: "Something went wrong in problem deletion",
      });
    }
    const problemDel = await Problems.deleteOne({ _id: id });
    const problems = await Problems.find({}, "problem_title");
    console.log(problemDel);
    return NextResponse.json({
      message: "Problem fetched successfully",
      status: 200,
      problems,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong in problem deletion",
    });
  }
}
