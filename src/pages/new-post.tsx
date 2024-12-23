import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { createPost } from "../services/posts.service";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


export const NewPost: React.FC = () => {
  //temporary user ID measure: better version will poll with login sessions
  const [currentMood, setCurrentMood] = useState('❓');
  const navigate = useNavigate();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postData = {
      content: currentMood,
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
    const selectedMood = e.native
    console.log(selectedMood);
    setCurrentMood(selectedMood);
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <div id="new-post-body">
        <h1 id="page-title" className="content__title">
        What's your vibe?
        </h1>
        <div className="content__body">
          <p id="page-description">
          </p>
          <div className="selected-mood">
            {currentMood}
          </div>
          <div>
          <Picker id="emoji-picker" data={data} onEmojiSelect={handleClick} />
          <p id="post-form">
            <form onSubmit={handleSubmit}>
              <button type="submit" className="post-submit-button">Submit</button>
            </form>
          </p>
          </div>
        </div>
      </div>
      </div>
    </PageLayout>
  );
};
