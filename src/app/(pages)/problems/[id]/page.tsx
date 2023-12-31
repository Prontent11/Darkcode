"use client";
import { useRouter } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Problem from "@/components/Problem";
import Testcases from "@/components/Testcases";
import axios from "axios";
import { fetchProblem } from "@/lib/problemlib";
import UserContext from "@/app/context/userContext";
import { toast } from "react-toastify";
import CodeEditorHead from "@/components/CodeEditorHead";
import LoadingComponent from "@/components/Loading";
const Problems = ({ params }: any) => {
  const id = params.id;

  const router = useRouter();
  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");

  const [userTheme, setUserTheme] = useState("vs-dark");

  const [fontSize, setFontSize] = useState(20);

  const [userInput, setUserInput] = useState("");

  const [userOutput, setUserOutput] = useState("");

  const [problem, setProblem] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const getProblem = async () => {
    try {
      setLoading(true);
      const search = `../api/problems/${id}`;
      const response = await axios.get(search);
      setProblem(response.data.problem);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProblem();
  }, []);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const userEmail = currentUser?.email;
      console.log(currentUser);
      const data = {
        problem,
        userCode,
        userLang,
        userEmail,
      };
      const respone = await axios.post("../api/submit", data);
      // const respone = 3;
      let message = "";
      if (respone.data.data.status.id == 3) {
        message = " ✅ Problem accepted";
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (respone.data.data.status.id == 4) {
        message = " ❌ Wrong Answer";
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        message = " 🚫 Compilation Error";
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      console.log("working.....");
      console.log(respone);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const options = {
    fontSize: fontSize,
  };
  return loading ? (
    <div>
      <LoadingComponent />
    </div>
  ) : (
    <div className="  w-full justify-start flex overflow-hidden">
      <div className="problem h-full flex-1 ">
        <Problem problem={problem} />
      </div>
      <div className="flex-1 overflow-hidden h-full">
        <CodeEditorHead
          userLang={userLang}
          setUserLang={setUserLang}
          userTheme={userTheme}
          setUserTheme={setUserTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          Submit={onSubmit}
        />

        <Editor
          className="h-[610px] "
          options={options}
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
