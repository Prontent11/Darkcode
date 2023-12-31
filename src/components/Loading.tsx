import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override: SerializedStyles = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingComponent: React.FC = () => {
  const loaderProps: any = {
    color: "#36D7B7",
    css: override,
    size: 50,
    margin: 2,
  };

  return (
    <div
      style={{ textAlign: "center", padding: "20px" }}
      className="flex flex-col items-center w-full h-[500px] justify-center "
    >
      <RingLoader {...loaderProps} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
