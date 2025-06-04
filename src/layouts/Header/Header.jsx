import React from "react";
import Logo from "../../components/Logo/Logo";
import HeaderLogo from "../../components/Logo/HeaderLogo";
import { useNavigate } from "react-router-dom";
import logo from "../../components/Logo/HeaderLogo";

export default function Header() {
  return (
    <header className="header">
      <HeaderLogo />
      {/* <Logo  /> */}
    </header>
  );
}
