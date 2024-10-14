import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { UserFeed } from "./pages/user-feed";
import {NewPost} from "./pages/new-post";

export const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route
        path="/feed"
        element={<AuthenticationGuard component={UserFeed} />}
      />
      <Route
        path="/new-post"
        element={<AuthenticationGuard component={NewPost} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
