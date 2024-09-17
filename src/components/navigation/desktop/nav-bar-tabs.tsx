import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/public" label="Public" />
      {isAuthenticated && (
        <>
          <NavBarTab path="/profile" label="Profile" />
          <NavBarTab path="/user-feed" label="Your Feed" />
          <NavBarTab path="/new-post" label="New Post" />
        </>
      )}
    </div>
  );
};
