import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { MobileNavBarTab } from "./mobile-nav-bar-tab";

interface MobileNavBarTabsProps {
  handleClick: () => void;
}

export const MobileNavBarTabs: React.FC<MobileNavBarTabsProps> = ({
  handleClick,
}) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="mobile-nav-bar__tabs">
      {isAuthenticated && (
        <>
          <MobileNavBarTab
            path="/profile"
            label="Profile"
            handleClick={handleClick}
          />
          <MobileNavBarTab
            path="/feed"
            label="Your Feed"
            handleClick={handleClick}
          />
          <MobileNavBarTab
            path="/new-post"
            label="New Post"
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
};
