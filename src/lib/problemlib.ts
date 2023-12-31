"use server";

import { connect } from "@/dbconfig/dbCofign";
import Problems from "@/models/problemModel";

connect();
export async function fetchProblem(userId: string) {
  try {
    const response = await Problems.findOne({ _id: userId });
    console.log(response);
    const problem = JSON.parse(JSON.stringify(response));
    return problem;
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
