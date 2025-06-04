import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import ChatWithUsButton from "../../components/buttons/ChatWithUsButton";
import dash from "../../assets/icons/dash.svg";
import beach from "../../assets/icons/beach.svg";
import dropbox from "../../assets/icons/dropbox.svg";
import house from "../../assets/icons/house.svg";
import chef from "../../assets/icons/chef.svg";
import camera from "../../assets/icons/cam.svg";
import shop from "../../assets/icons/shop.svg";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("All");

  const handleClick = (item) => {
    setActiveItem(item);
  };

  // Define the sidebar items
  const sideBarItems = [
    { name: "All", icon: dash },
    { name: "Top Attractions", icon: beach },
    { name: "Packages", icon: dropbox },
    { name: "Hotels", icon: house },
    { name: "Dining", icon: chef },
    { name: "Live", icon: camera },
    { name: "Shopping", icon: shop },
  ];

  return (
    <nav className="side-bar normal-title-txt">
      {/* <Logo /> */}
      <ul className="side-bar-list">
        {sideBarItems.map((item) => (
          <div
            className={`side-bar-list-item-container ${
              activeItem === item.name ? "active" : ""
            }`}
            onClick={() => handleClick(item.name)}
          >
            <li
              key={item.name}
              className="side-bar-list-item "
              onClick={() => handleClick(item.name)}
            >
              <div className="item-icon">
                <img src={item.icon} alt={item.name} />
              </div>
              <div className="item-text">
                {item.name.split(" ").map((word, index) => (
                  <div key={index}>{word}</div>
                ))}
              </div>
            </li>
          </div>
        ))}
      </ul>
      <div className="side-bar-bottom">
        <ChatWithUsButton />
      </div>
    </nav>
  );
}
