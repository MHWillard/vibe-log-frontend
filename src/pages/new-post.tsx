import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { createPost } from "../services/posts.service";
import { getUserId } from "../services/users.service";


export const NewPost: React.FC = () => {
  //temporary user ID measure: better version will poll with login sessions
  const [postContent, setPostContent] = useState<string>("");
  const [userid, setUserid] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const { data, error } = await getUserId();

      if (!isMounted) {
        return;
      }

      if (data) {
        setUserid(JSON.stringify(data, null, 2));
      }

      if (error) {
        setUserid(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setPostContent(value);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postData = {
      content: postContent,
      userId: userid,
    }

    const { data, error } = await createPost(postData);

    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }

    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };


  /*

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
