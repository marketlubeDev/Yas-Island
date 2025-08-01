import React from "react";
import HeaderLogo from "../../components/Logo/HeaderLogo";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return <header className="header">{!isMobile && <HeaderLogo />}</header>;
}
