import React from "react";
//import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";
import { NavBarTabs } from "./nav-bar-tabs";

export const NavBar: React.FC = () => {
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarTabs />
        <NavBarButtons />
      </nav>
    </div>
  );
};
