"use client";
import UserContext from "@/app/context/userContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post("./api/login", user);
      console.log("loggedin successfully");

      toast.success("LoggedIn Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push("/problems");
      setCurrentUser(response.data.userDetails);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen border border-solid  border-white">
      <div className="flex flex-col h-1/2 items-center gap-2">
        <h1 className="text-3xl mb-5">Login</h1>
        <label htmlFor="email">Email</label>
        <input
          className=" mx-2 rounded-md text-black px-2 py-1"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className=" mx-2 rounded-md text-black px-2 py-1"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="bg-blue-500 w-fit rounded-xl p-1 px-5"
          onClick={onLogin}
        >
          Login
        </button>
        <p>
          Don't have an account ? <Link href={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
