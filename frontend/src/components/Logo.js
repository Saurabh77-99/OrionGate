import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../assets/Oriongate1-removebg-preview.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="
     absolute top-[1.5rem] left-[1.5rem] [text-decoration:none]
text-lg flex items-center w-12 
     "
    >
      <img src={logoSvg} alt="OrionGate" />
      <span>OrionGate</span>
    </Link>
  );
};

export default Logo;
