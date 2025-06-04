import React from "react";

export default function AddtoCartbtn({ onClick }) {
  return (
    <div className="AddtoCartbtn">
      <button className="AddtoCartbtn__button" onClick={onClick}>
        Add to Cart
      </button>
    </div>
  );
}
