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
  const [posts, setPosts] = useState<any>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const { data, error } = await getPosts();

        if (!isMounted) {
          return;
        }

        if (data && Array.isArray(data)) {
          const postsData: Post[] = data.map((item: any) => ({
            post_table_id: item.post_table_id,
            userid: item.user_id,
            content: item.content,
            post_id: item.post_id,
            post_date: new Date(item.post_date),
          }));

          setPosts(postsData);
        } else {
          console.error("Unexpected data format:", data);
        }

        if (error) {
          setError(JSON.stringify(error, null, 2));
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("An error occurred while fetching posts.");
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderPosts = () => {
    return posts.map((post:Post) => (
      <div key={post.post_id} className="post">
        <em>{post.post_date.toDateString()}</em>
        <h3>{post.content}</h3>
      </div>
    ));
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Your Feed
        </h1>
        <div className="content__body">
          {/*<CodeSnippet title="Protected Message" code={message} />*/}
          {renderPosts()}
        </div>
      </div>
    </PageLayout>
  );
};
