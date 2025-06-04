import React from "react";
import "./_search.scss";
import CommonIcons from "../../../assets/icons/lens.svg";

export default function Search() {
  const fontSize = ".8rem";

  return (
    <div className="search base-filter" style={{ fontSize }}>
      <img
        src={CommonIcons}
        alt="search"
        width="22px"
        height="22px"
        style={{
          marginRight: "10px",
        }}
      />
      <input type="text" placeholder="what are you looking for?" />
    </div>
  );
}
