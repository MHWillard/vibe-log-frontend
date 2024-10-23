import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPosts } from "../services/posts.service";

interface Post {
  post_table_id: number,
  userid: number,
  content: string,
  post_id: number,
  post_date: Date,
}

export const UserFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const { data, error } = await getPosts();

      if (!isMounted) {
        return;
      }

      if (data) {
        //setMessage(JSON.stringify(data, null, 2));
        setPosts(data);
        
        /*
        const postsData: Post[] = data.map((item: any) => ({
          post_id: item.id, // Adjust field names as necessary
          userid: item.userId,
          content: item.content,
        }));
        
        setPosts(data as Post[]);
        //const postsArray: Post[] = data;
        //setPosts(postsArray);
        */
        console.log(JSON.stringify(data, null, 2));
      }

      if (error) {
        setError(JSON.stringify(error, null, 2));
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderPosts = () => {
    return posts.map(post => {
      <div key={post.post_id} className="post">
        <em>{post.post_date.toDateString()}</em>
        <h3>{post.content}</h3>
      </div>
    });
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Your Feed
        </h1>
        <div className="content__body">
          {/*<CodeSnippet title="Protected Message" code={message} />*/}
          {/*renderPosts*/}
          test
        </div>
      </div>
    </PageLayout>
  );
};
