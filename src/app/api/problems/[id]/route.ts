import Problems from "@/models/problemModel";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextApiRequest, { params }: any) {
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
