"use server";
// import base64;
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
  input: String,
  output: String,
  lang: any
) => {
  try {
    console.log(lang + "lang");

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
    let t = 3;
    const parameter = {
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      method: "GET",

      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    };
    while (true) {
      const response = await axios.request({
        ...options,
        ...parameter,
      });
      const statusId = response.data.status.id;
      console.log(response.data);
      if (statusId === 3) {
        return response;
      } else if (statusId === 6) {
        return response;
      } else if (statusId === 4) {
        return response;
      } else if (statusId == 11) {
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
