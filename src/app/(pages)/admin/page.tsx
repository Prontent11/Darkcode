"use client";
import UserContext from "@/app/context/userContext";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import ReactQuill from "react-quill";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
const Admin = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [problem, setProblem] = useState({
    title: "",
    description: "",
    input: "",
    output: "",
    difficulty: "Easy",
  });
  useEffect(() => {
    if (currentUser?.admin === false) {
      return redirect("/");
    }
  }, []);
  const difficulties = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  const Submit = async () => {
    try {
      alert("Are you sure you want to submit");
      const response = await axios.post("./api/problems", problem);
      console.log(response.data);
    } catch (error) {
      console.log("Something went wrong in problem creation", error);
    }
    setProblem({
      title: "",
      description: "",
      input: "",
      output: "",
      difficulty: "Easy",
    });
  };
  return (
    <>
      <div>
        <div className="p-10 pb-5 pl-20  flex flex-col gap-3 box-border bg-[#1A1A1A]">
          <div className="container flex items-center justify-between w-[950px] ">
            <div>
              <label className=" mb-2 text-2xl" htmlFor="title">
                Problem Title
              </label>
              <input
                type="text"
                className="ml-2 rounded-md p-2 text-black"
                required
                value={problem.title}
                onChange={(e: any) =>
                  setProblem({ ...problem, title: e.target.value })
                }
              />
            </div>
            <div className="flex">
              <label htmlFor="di mb-2 fficulty " className="text-2xl">
                Problem Difficulty
              </label>
              <Select
                id={Date.now().toString()}
                className="text-black"
                options={difficulties}
                value={problem.difficulty}
                onChange={(e: any) =>
                  setProblem({ ...problem, difficulty: e.value })
                }
                placeholder={problem.difficulty}
              />
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <div className="container flex flex-col  ">
              <label className=" mb-2 text-2xl" htmlFor="description">
                Problem Description
              </label>
              <ReactQuill
                id="description"
                value={problem.description}
                onChange={(e: any) =>
                  setProblem({ ...problem, description: e })
                }
                theme="snow"
                className=" w-[400px] h-[400px] rounded-xl overflow-hidden  bg-white text-black"
              />
            </div>
            <div className="container flex flex-col  ">
              <label className=" mb-2 text-2xl" htmlFor="preview">
                Problem Preview
              </label>
              <div className=" overflow-y-auto rounded-xl w-[400px] h-[400px] bg-gray-200 p-5 resize-none text-black">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <div className="container flex flex-col  ">
              <label className=" mb-2 text-2xl" htmlFor="input">
                Input
              </label>
              <textarea
                id="input"
                required
                className="rounded-xl w-[250px] h-[15vh]  p-1 resize-none text-black"
                value={problem.input}
                onChange={(e: any) =>
                  setProblem({ ...problem, input: e.target.value })
                }
              />
            </div>
            <div className="container flex flex-col  ">
              <label className=" mb-2 text-2xl" htmlFor="output">
                Output
              </label>
              <textarea
                id="output"
                required
                className="rounded-xl w-[250px] h-[15vh]  p-1 resize-none text-black"
                value={problem.output}
                onChange={(e: any) =>
                  setProblem({ ...problem, output: e.target.value })
                }
              />
            </div>
          </div>
          <div className="container">
            <button
              className="rounded-md px-3 py-2 hover:bg-green-600 text-white bg-green-500"
              onClick={Submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
