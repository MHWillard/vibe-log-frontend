import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getProtectedResource } from "../services/message.service";


export const NewPost: React.FC = () => {
  const [postContent, setPostContent] = useState<string>("");
  const [userid, setUserid] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setPostContent(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('post content:', postContent);
  };


  /*
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      postInput: HTMLInputElement
    }
    setPostContent(formElements.postInput.value)
  }

  handleSubmit:
  -prevent default event
  -get form data
  -convert to object
  -spit to backend through API handler

  */

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              <strong>New Post</strong>
            </span>
          </p>
          <p id="post-form">
            What's your vibe?
            <form onSubmit={handleSubmit}>
              <input id="postInput" type="text" name="content" value={postContent} onChange={handleChange}/>
              <button type="submit">Submit</button>
            </form>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
