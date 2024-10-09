import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getProtectedResource } from "../services/message.service";

export const NewPost: React.FC = () => {
  const [postContent, setPostContent] = useState<string>("");
  const [userid, setUserid] = useState<number>(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      postInput: HTMLInputElement
    }
    setPostContent(formElements.postInput.value)
  }


  //capture data from page form
  //assign to json object
  //spit that to backend to do work

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <p id="post-form">
            What's your vibe?
            <form onSubmit={handleSubmit}>
              <input id="postInput" />
              <button type="submit">Submit</button>
            </form>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
