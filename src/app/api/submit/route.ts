import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "@/dbconfig/dbCofign";
import { getProblemSubmission, submitProblem } from "@/lib/problemSubmission";
connect();
export async function POST(request: NextRequest) {
  try {
    console.log("submitting problem");

    const reqBody = await request.json();
    const { problemId, problem, userCode, userLang, userEmail } = reqBody;
    const { problem_input, problem_output, _id } = problem;
    const problem_id = _id; //problem id
    let codelang;
    if (userLang == "cpp") {
      codelang = 54;
    } else if (userLang == "python") {
      codelang = 71;
    } else if (userLang == "c") {
      codelang = 48;
    } else if (userLang == "java") {
      codelang = 91;
    }
    console.log(userLang);
    const token = await submitProblem(
      userCode,
      problem_input,
      problem_output,
      codelang
    );
    console.log(token.token);
    const response = await getProblemSubmission(token.token);
    // console.log(response);
    const data = await response.data;
    const outputn = Buffer.from(data?.expected_output, "base64").toString(
      "utf-8"
    );
    // const stdout = Buffer.from(data?.stdout, "base64").toString("utf-8");
    // const stdin = Buffer.from(data?.stdin, "base64").toString("utf-8");
    // console.log(outputn);
    // console.log(stdout);
    // console.log(stdin);
    // console.log("stdout");

    console.log(data);
    if (data.status.id === 3) {
      const user = await User.updateOne(
        { email: userEmail },
        { $addToSet: { solvedProblems: problem_id } }
      );
    }
    return NextResponse.json({
      message: "successfull submitted",
      data,
    });
  } catch (error: any) {
    console.log("Error while submitting code", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
