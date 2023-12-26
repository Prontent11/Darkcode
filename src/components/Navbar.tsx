"use client";
import React from "react";
import Select from "react-select";

const Navbar = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
  Submit,
}: any) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="flex py-5 p-2 items-center justify-between gap-3 border-b border-solid border-white">
      <div className="flex items-center gap-4">
        <Select
          id={Date.now().toString()}
          className="text-black"
          options={languages}
          value={userLang}
          onChange={(e) => setUserLang(e.value)}
          placeholder={userLang}
        />
        <Select
          className="text-black"
          options={themes}
          value={userTheme}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
        />
        <label>Font Size</label>
        <input
          type="range"
          min="18"
          max="30"
          value={fontSize}
          step="2"
          onChange={(e) => {
            setFontSize(e.target.value);
          }}
        />
      </div>
      <button
        className="run-btn py-1 px-5 rounded-xl  bg-green-700 w-fit"
        onClick={Submit}
      >
        Run
      </button>
    </div>
  );
};

export default Navbar;
