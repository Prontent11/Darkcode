"use client";
import UserContext from "@/app/context/userContext";
import LoadingComponent from "@/components/Loading";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { currentUser, loginUser } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("./api/login", user);
      console.log("loggedin successfully");
      router.push("/problems");
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

      loginUser(response.data.userDetails);
    } catch (error: any) {
      console.log(error.response.data);
      toast.success(error.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className="flex justify-center items-center mt-20 h-fit">
      <div className="flex flex-col max-w-md w-full p-5 gap-2">
        <h1 className="text-3xl mb-5">Login</h1>
        <label htmlFor="email">Email</label>
        <input
          className="rounded-md text-black px-2 py-1"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="rounded-md text-black px-2 py-1"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="bg-blue-500 w-full rounded-xl p-1 px-5"
          onClick={onLogin}
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account? <Link href={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
