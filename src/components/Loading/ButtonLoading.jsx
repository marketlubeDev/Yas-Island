import React from "react";

  function Loading({ height = "25px", width = "25px" }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div className="loader" style={{ height: height, width: width }}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
      </div>
    </div>
  );
}

export default Loading;
