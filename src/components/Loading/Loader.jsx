import React from "react";

const loaderStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  position: "relative",
  display: "inline-block",
  background: `conic-gradient(
    #B32757 0deg,
    #129CC0 72deg,
    #6FBCC7 144deg,
    #E42D2A 216deg,
    #F9BE61 288deg,
    #B32757 360deg
  )`,
  animation: "rotate 2s linear infinite",
  filter: "blur(1px)",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

const innerCircle = {
  position: "absolute",
  width: "92px",
  height: "92px",
  borderRadius: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  filter: "blur(0.5px)"
};

const keyframesStyle = `
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function Loader() {
  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={loaderStyle}>
        <div style={innerCircle}></div>
      </div>
    </>
  );
}

export default Loader;
