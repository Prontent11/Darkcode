"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Navbar from "@/components/Navbar";
import Problem from "@/components/Problem";
import Testcases from "@/components/Testcases";
const Problems = ({ params }: any) => {
  const prob = params.id;
  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");

  const [userTheme, setUserTheme] = useState("vs-dark");

  const [fontSize, setFontSize] = useState(20);

  const [userInput, setUserInput] = useState("");

  const [userOutput, setUserOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };
  return (
    <div className="h-screen w-screen border border-solid border-white flex">
      <div className="problem h-full w-1/2 border border-solid border-white ">
        <Problem />
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
        />
        <div className="left-container flex flex-col items-center gap-3 ">
          <Editor
            options={options}
            className=""
            height="620px"
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
    </div>
  );
};

export default Problems;
