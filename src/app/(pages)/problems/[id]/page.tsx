"use client";
import UserContext from "@/app/context/userContext";
import LoadingComponent from "@/components/Loading";
import Problem from "@/components/Problem";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useCallback, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
import CodeEditorHead from "@/components/CodeEditorHead";

interface ProblemsProps {
  params: { id: string };
}

const Problems: React.FC<ProblemsProps> = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  const [userCode, setUserCode] = useState<string>("");
  const [userLang, setUserLang] = useState<string>("python");
  const [userTheme, setUserTheme] = useState<string>("vs-dark");
  const [fontSize, setFontSize] = useState<number>(20);
  const [problem, setProblem] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useContext(UserContext);

  const getProblem = useCallback(async () => {
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
  }, []);
  useEffect(() => {
    getProblem();
  }, []);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const userEmail = currentUser?.email;
      const data = {
        problem,
        userCode,
        userLang,
        userEmail,
      };
      const response = await axios.post("../api/submit", data);
      let message = "";
      if (response.data.data.status.id === 3) {
        message = " ✅ Problem accepted";
        toast.success(message, {
          /* ...toast options */
        });
      } else if (response.data.data.status.id === 4) {
        message = " ❌ Wrong Answer";
        toast.error(message, {
          /* ...toast options */
        });
      } else {
        message = " 🚫 Compilation Error";
        toast.error(message, {
          /* ...toast options */
        });
      }

      console.log("working.....");
      console.log(response);
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
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 overflow-hidden">
        <Problem problem={problem} />
      </div>
      <div className="md:w-1/2 md:overflow-hidden">
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
          className="h-96 md:h-[615px]"
          options={options}
          theme={userTheme}
          language={userLang}
          defaultLanguage="python"
          defaultValue="Enter your code here"
          onChange={(value: string | undefined) => {
            setUserCode(value || " ");
          }}
        />
      </div>
    </div>
  );
};

export default Problems;
