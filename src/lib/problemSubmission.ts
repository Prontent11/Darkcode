"use server";

import codeToJson from "@/helper/codeToJson";

const axios = require("axios");

const options = {
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "content-type": "application/json",
    "Content-Type": "application/json",
  },
};

export const submitProblem = async (
  code: any,
  input: any,
  output: any,
  lang: any
) => {
  try {
    const formattedCode = codeToJson(code);
    const parameter = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      data: {
        language_id: lang,
        source_code: code,
        stdin: input,
        expected_output: output,
      },
    };
    const response = await axios.request({
      ...options,
      ...parameter,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProblemSubmission = async (token: any) => {
  try {
    let t = 20;
    while (true) {
      const parameter = {
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      };
      const response = await axios.request({
        ...options,
        ...parameter,
      });
      const statusId = response.data.status.id;
      console.log(statusId);
      if (statusId === 3) {
        return response;
      } else if (statusId === 6) {
        return response;
      }
      // return response;
      // console.log(response.data);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  } catch (error) {
    console.error(error);
  }
};
