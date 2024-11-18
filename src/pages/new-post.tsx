import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { createPost } from "../services/posts.service";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


export const NewPost: React.FC = () => {
  //temporary user ID measure: better version will poll with login sessions
  const [postContent, setPostContent] = useState<string>("");
  const [currentMood, setCurrentMood] = useState('😄');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setPostContent(value);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postData = {
      content: postContent,
      userId: "userid-temp",
    }

    const { data, error } = await createPost(postData);

    if (data) {
      console.log(JSON.stringify(data, null, 2));
      navigate("/feed");
    }

    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const handleClick = (e:any) => {
    //const selectedMood = e.detail.native
    console.log(e.detail.unicode);
    //setCurrentMood(selectedMood);
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
        New Post
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              <strong>What's your vibe? (Posting feature currently a work in progress.)</strong>
            </span>
          </p>
          <div className="selected-mood">
            {currentMood}
          </div>
          <p id="post-form">
            <form onSubmit={handleSubmit}>
              <input id="postInput" type="text" name="content" value={postContent} onChange={handleChange}/><br/>
              <button type="submit" className="post-submit-button">Submit</button>
            </form>
          </p>
          <div>
          <Picker data={data} onEmojiSelect={handleClick} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
