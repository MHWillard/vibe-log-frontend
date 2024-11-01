//import React from "react";
//import { Auth0Resource } from "../models/auth0-resource";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>Developed by Matt Willard. Learn more at&nbsp;</span>
              <PageFooterHyperlink path="https://mattwillard.dev/">
                <>mattwillard.dev</>
              </PageFooterHyperlink>
            </p>
          </div>
      </div>
      </div>
    </footer>
  );
};
