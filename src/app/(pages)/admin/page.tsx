"use client";
import UserContext from "@/app/context/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
      router.push("/");
    }
  }, [currentUser, router]);

  const difficulties = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const submitProblem = async () => {
    try {
      alert("Are you sure you want to submit?");
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
    <div className="bg-[#1A1A1A] min-h-screen p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col gap-3">
          <div className="flex md:flex-row items-center md:items-center  md:justify-between  mb-4 md:mb-8 flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-xl md:text-2xl" htmlFor="title">
                Problem Title
              </label>
              <input
                type="text"
                className="rounded-md p-2 text-black"
                required
                value={problem.title}
                onChange={(e: any) =>
                  setProblem({ ...problem, title: e.target.value })
                }
              />
            </div>
            <div className="flex items-center">
              <label className="text-xl md:text-2xl ml-4" htmlFor="difficulty">
                Problem Difficulty
              </label>
              <Select
                className="text-black ml-2"
                options={difficulties}
                value={{ value: problem.difficulty, label: problem.difficulty }}
                onChange={(e: any) =>
                  setProblem({ ...problem, difficulty: e.value })
                }
                placeholder={problem.difficulty}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xl md:text-2xl" htmlFor="description">
                Problem Description
              </label>
              <ReactQuill
                id="description"
                value={problem.description}
                onChange={(e: any) =>
                  setProblem({ ...problem, description: e })
                }
                theme="snow"
                className="w-full h-[400px] rounded-xl overflow-hidden bg-white text-black"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl md:text-2xl" htmlFor="preview">
                Problem Preview
              </label>
              <div className="overflow-y-auto rounded-xl w-full h-[400px] bg-gray-200 p-5 resize-none text-black">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xl md:text-2xl" htmlFor="input">
                Input
              </label>
              <textarea
                id="input"
                required
                className="rounded-xl w-full h-[15vh] p-1 resize-none text-black"
                value={problem.input}
                onChange={(e: any) =>
                  setProblem({ ...problem, input: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl md:text-2xl" htmlFor="output">
                Output
              </label>
              <textarea
                id="output"
                required
                className="rounded-xl w-full h-[15vh] p-1 resize-none text-black"
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
              onClick={submitProblem}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
