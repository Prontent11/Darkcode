"use client";

import UserContext from "@/app/context/userContext";
import LoadingComponent from "@/components/Loading";
import ProblemTable from "@/components/Table";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ProblemSet = () => {
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  // console.log(currentUser);

  const getAllProblems = async () => {
    try {
      setLoading(true);
      const respone = await axios.get("./api/allproblems");
      // console.log(respone.data);
      setProblems(respone.data.problems);
    } catch (error: any) {
      console.log(
        "something went wrong while fetching problems" + error.message
      );
    } finally {
    }
  };
  const getSolvedProblems = async (currentUser: any) => {
    try {
      setLoading(true);
      console.log(currentUser);
      const response = await axios.get(`./api/allproblems/${currentUser.id}`);
      console.log(response.data.userSolved.solvedProblems);
      setSolvedProblems(response.data.userSolved.solvedProblems);
    } catch (error: any) {
      console.log(
        "something went wrong while fetching solved problems" + error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProblems();
  }, []);
  useEffect(() => {
    if (currentUser) getSolvedProblems(currentUser);
  }, [currentUser]);
  const onDelete = async (id: any) => {
    try {
      const response = await axios.delete(`./api/problems/${id}`);
      console.log("Problem deleted");
      setProblems(response.data.problems);
    } catch (error: any) {
      console.log(error.message);
    }
    return;
  };
  return (
    <div className="flex flex-col items-center px-20 pt-10 box-border h-fit ">
      <div className="  w-full px-5 py-5 flex flex-col items-center gap-3 ">
        {}
        {loading ? (
          <LoadingComponent />
        ) : (
          <ProblemTable problems={problems} solvedProblems={solvedProblems} />
        )}
      </div>
    </div>
  );
};

export default ProblemSet;
