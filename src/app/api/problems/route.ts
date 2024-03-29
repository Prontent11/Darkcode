import { connect } from "@/dbconfig/dbCofign";
import { NextRequest, NextResponse } from "next/server";
import Problems from "@/models/problemModel";
import Problem from "@/components/Problem";
import { NextApiRequest } from "next";
connect();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { title, description, input, output, difficulty } = requestBody;
    if (!title && !description && !input && !output) {
      return NextResponse.json({
        message: "Please fill all the fields",
      });
    }
    console.log(difficulty);

    const newProblem = new Problems({
      problem_title: title,
      problem_description: description,
      problem_input: input,
      problem_output: output,
      problem_difficulty: difficulty,
    });
    await newProblem.save();
    return NextResponse.json({
      message: "Problem created successfully",
      status: 200,
      data: requestBody,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong in problem creation",
    });
  }
}
