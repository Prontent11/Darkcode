"use client";
// Import necessary modules and components
import UserContext from "@/app/context/userContext";
import LoadingComponent from "@/components/Loading";
import ProblemTable from "@/components/Table";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// Define the interface for the ProblemSetProps
interface ProblemSetProps {}

// Define the ProblemSet component
const ProblemSet: React.FC<ProblemSetProps> = () => {
  // Define state variables using TypeScript
  const [problems, setProblems] = useState<any[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<any[]>([]);
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  // Define asynchronous function to fetch all problems
  const getAllProblems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("./api/allproblems");
      setProblems(response.data.problems);
    } catch (error: any) {
      console.log(
        "Something went wrong while fetching problems" + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Define asynchronous function to fetch solved problems for a specific user
  const getSolvedProblems = async (currentUser: any) => {
    try {
      setLoading(true);
      const response = await axios.get(`./api/allproblems/${currentUser.id}`);
      setSolvedProblems(response.data.userSolved.solvedProblems);
    } catch (error: any) {
      console.log(
        "Something went wrong while fetching solved problems" + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch all problems on component mount
  useEffect(() => {
    getAllProblems();
  }, []);

  // Fetch solved problems when currentUser changes
  useEffect(() => {
    if (currentUser) getSolvedProblems(currentUser);
  }, [currentUser]);

  // Define function to handle problem deletion
  const onDelete = async (id: any) => {
    try {
      const response = await axios.delete(`./api/problems/${id}`);
      setProblems(response.data.problems);
      console.log("Problem deleted");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Return the JSX for the component with Tailwind CSS classes
  return (
    <div className="flex flex-col items-center px-4 pt-8 md:px-8 lg:px-16 box-border">
      <div className="w-full px-4 py-4 md:px-8 md:py-8 lg:px-16 lg:py-16 flex flex-col items-center gap-3">
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
