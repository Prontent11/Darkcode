import React from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingComponent = () => {
  return (
    <div
      style={{ textAlign: "center", padding: "20px" }}
      className="flex flex-col items-center"
    >
      <RingLoader color={"#36D7B7"} css={override} size={50} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
