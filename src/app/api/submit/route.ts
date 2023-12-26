import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbCofign";
import { getProblemSubmission, submitProblem } from "@/lib/problemSubmission";
connect();
export async function POST(request: NextRequest) {
  try {
    console.log("submitting problem");

    const reqBody = await request.json();
    const { problem, userCode, userLang } = reqBody;
    const { problem_input, problem_output } = problem;
    const codeLang = 54;
    const token = await submitProblem(
      userCode,
      problem_input,
      problem_output,
      codeLang
    );
    console.log(token.token);
    const response = await getProblemSubmission(token.token);
    console.log(response);
    const data = await response.data;
    return NextResponse.json({
      message: "successfull submitted",
      data,
    });
  } catch (error: any) {
    console.log("Error while submitting code", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
