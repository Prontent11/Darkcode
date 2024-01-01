"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<{
  currentUser: any;
  setCurrentUser: (status: any) => void;
  logoutUser: () => void;
  loginUser: (userData: User) => void;
}>({
  currentUser: {},
  setCurrentUser: () => {},
  logoutUser: () => {},
  loginUser: (userData: User) => {},
});
interface User {
  id: string;
  username: string;
  email: string;
  admin: Boolean;
}
export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("userDetails");
  };
  const loginUser = (userDetails: User) => {
    setCurrentUser(userDetails);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  };
  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    let value = JSON.parse(data!);
    setCurrentUser(value);
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, logoutUser, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
