import React from "react";
//import { Auth0Features } from "src/components/auth0-features";
import { HeroBanner } from "src/components/hero-banner";
import { PageLayout } from "../components/page-layout";
import {MainSummary} from "../components/main-page-summary";

export const HomePage: React.FC = () => (
  <PageLayout>
    <>
      <HeroBanner />
      <MainSummary />
    </>
  </PageLayout>
);
