import { useContext, useState } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import UserContext from "@/app/context/userContext";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-black">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-xl">
            <Link href="/" className="text-4xl">
              <span className="text-blue-300">Dark</span>Code
            </Link>
          </div>

          {/* Hamburger icon for mobile */}
          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </div>

          {/* Navigation links on the right (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-4 text-white text-lg">
            <Link
              href="/problems"
              className="hover:bg-blue-300 px-3 py-2 rounded-md hover:text-white"
            >
              Problems
            </Link>
            {currentUser?.admin && (
              <Link
                href="/admin"
                className="hover:bg-blue-300 px-3 py-2 rounded-md hover:text-white"
              >
                Admin
              </Link>
            )}
            <div className="rounded-md">{currentUser && <Dropdown />}</div>
          </div>
        </div>

        {/* Mobile menu (visible when toggled) */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2">
            <Link
              href="/problems"
              className="block py-2 px-4 text-white hover:bg-blue-300 rounded-md"
            >
              Problems
            </Link>
            {currentUser?.admin && (
              <Link
                href="/admin"
                className="block py-2 px-4 text-white hover:bg-blue-300 rounded-md"
              >
                Admin
              </Link>
            )}
            {currentUser && <Dropdown />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
