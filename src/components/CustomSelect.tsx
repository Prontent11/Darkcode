"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
const CustomSelect = ({ languages, userLang, setUserLang }: any) => {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <Select
      id={id}
      className="text-black"
      options={languages}
      value={userLang}
      onChange={(e) => setUserLang(e.value)}
      placeholder={userLang}
    />
  ) : null;
};

export default CustomSelect;
