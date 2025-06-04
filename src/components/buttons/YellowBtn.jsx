import React from "react";

function YellowBtn({ children, onClick }) {
  return (
    <button className="btn yellow-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default YellowBtn;
