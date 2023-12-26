"use client";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Navbar from "@/components/Navbar";
import Problem from "@/components/Problem";
import Testcases from "@/components/Testcases";
import axios from "axios";
import { fetchProblem } from "@/lib/problemlib";
const Problems = ({ params }: any) => {
  const id = params.id;

  const router = useRouter();
  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");

  const [userTheme, setUserTheme] = useState("vs-dark");

  const [fontSize, setFontSize] = useState(20);

  const [userInput, setUserInput] = useState("");

  const [userOutput, setUserOutput] = useState("");

  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState();
  const getProblem = async () => {
    try {
      const search = `../api/problems/${id}`;
      const response = await axios.get(search);

      setProblem(response.data.problem);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProblem();
  }, []);
  const onSubmit = async () => {
    try {
      const data = {
        problem,
        userCode,
        userLang,
      };
      const respone = await axios.post("../api/submit", data);
      if (respone.data.data.status.id == 3) {
        alert("Code Accepted");
      } else {
        alert("Code Rejected");
      }
      console.log("working.....");
      console.log(respone);
    } catch (error) {
      console.log(error);
    }
  };
  const options = {
    fontSize: fontSize,
  };
  return (
    <div className="h-screen box w-screen border border-solid border-white flex overflow-hidden">
      <div className="problem h-full w-1/2 border border-solid border-white ">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <Problem problem={problem} />
        </Suspense>
        {/* <Testcases /> */}
      </div>
      <div className="compiler h-full w-1/2 border border-solid border-white">
        <Navbar
          userLang={userLang}
          setUserLang={setUserLang}
          userTheme={userTheme}
          setUserTheme={setUserTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          Submit={onSubmit}
        />

        <Editor
          options={options}
          className=""
          height="100%"
          width="100%"
          theme={userTheme}
          language={userLang}
          defaultLanguage="python"
          defaultValue="Enter your code here"
          onChange={(value: any) => {
            setUserCode(value);
          }}
        />
      </div>
    </div>
  );
};

export default Problems;
