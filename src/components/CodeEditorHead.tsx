import React from "react";
import Select from "react-select";

const CodeEditorHead = ({
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
    <div className="flex flex-col   md:flex-row items-center justify-between gap-3 pb-3 mt-10">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Select
          id={Date.now().toString()}
          className="text-black "
          options={languages}
          value={userLang}
          onChange={(e) => setUserLang(e.value)}
          placeholder={userLang}
        />
        <Select
          id={Date.now().toString()}
          className="text-black"
          options={themes}
          value={userTheme}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
        />

        <label htmlFor="fontinput">Font Size</label>
        <input
          type="range"
          min="18"
          max="30"
          id="fontinput"
          value={fontSize}
          step="2"
          onChange={(e) => {
            setFontSize(e.target.value);
          }}
        />
      </div>
      <button
        className="run-btn py-1 px-5 rounded-xl  bg-green-700 w-fit mt-3 md:mt-0"
        onClick={Submit}
      >
        Run
      </button>
    </div>
  );
};

export default CodeEditorHead;
