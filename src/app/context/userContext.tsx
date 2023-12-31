"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<{
  currentUser: any;
  setCurrentUser: (status: any) => void;
}>({
  currentUser: {},
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    const value = JSON.parse(data!);
    setCurrentUser(value);
  }, []);
  useEffect(() => {
    if (currentUser)
      localStorage.setItem("userDetails", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
