"use client";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/userContext";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="min-h-screen bg-[#1A1A1A]">
        <Navbar />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="flex flex-col min-h-screen">
          <div className="container mx-auto p-4 sm:p-8 flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
}
