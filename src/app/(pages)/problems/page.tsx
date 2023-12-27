"use client";

import UserContext from "@/app/context/userContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProblemSet = () => {
  const [problems, setProblems] = useState([]);
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const getAllProblems = async () => {
    try {
      const respone = await axios.get("./api/allproblems");
      console.log(respone.data);
      setProblems(respone.data.problems);
    } catch (error: any) {
      console.log(
        "something went wrong while fetching problems" + error.message
      );
    }
  };
  useEffect(() => {
    getAllProblems();
  }, []);

  const Logout = async () => {
    try {
      setCurrentUser(null);
      await axios.get("./api/logout");
      console.log("Logged out successfully");
      router.push("/login");
      toast.error("Logged Out Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const onDelete = async (id: any) => {
    try {
      const response = await axios.delete(`./api/problems/${id}`);
      console.log("Problem deleted");
      setProblems(response.data.problems);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const Admin = () => {
    router.push("/admin");
  };
  return (
    <div className="flex flex-col items-center px-20 py-10 border-solid border border-white-500 h-screen ">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-3xl text-center my-5 ">Problems</h1>
        <button
          onClick={Logout}
          className="bg-red-500 px-3 py-2 rounded-xl text-white"
        >
          Logout
        </button>
        <button
          onClick={Admin}
          className="bg-green-500 px-3 py-2 rounded-xl text-white"
        >
          Admin
        </button>
      </div>
      <div className=" border-solid border border-white-500 w-full h-full px-5 py-5 flex flex-col items-center gap-3 ">
        {problems &&
          problems.map((problem: any) => {
            return (
              <div
                key={problem._id}
                className="py-2 px-2 border-solid border border-white-500 w-full"
              >
                <Link href={`problems/${problem._id}`}>
                  {problem.problem_title}
                </Link>
                {currentUser?.admin == true ? (
                  <>
                    {" "}
                    <button
                      onClick={() => onDelete(problem._id)}
                      className=" float-right bg-red-500 py-2 px-3 rounded-xl"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProblemSet;
