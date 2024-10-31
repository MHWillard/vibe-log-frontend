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

    var data = [{"post_table_id":18,"user_id":1234,"content":"happy","post_id":5678,"post_date":"2024-10-20T14:00:00Z"},{"post_table_id":19,"user_id":1234,"content":"sad","post_id":6789,"post_date":"2024-10-20T18:30:00Z"},{"post_table_id":20,"user_id":1234,"content":"excited","post_id":7890,"post_date":"2024-10-20T22:45:00Z"},{"post_table_id":21,"user_id":1234,"content":"angry","post_id":8901,"post_date":"2024-10-21T13:15:00Z"},{"post_table_id":22,"user_id":1234,"content":"calm","post_id":9012,"post_date":"2024-10-21T20:00:00Z"}]

    const postsData: Post[] = data.map((item: any) => ({
      post_table_id: item.post_table_id,
      userid: item.user_id,
      content: item.content,
      post_id: item.post_id,
      post_date: new Date(item.post_date),
    }));

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

    //fetchPosts();
    setPosts(postsData);

    return () => {
      isMounted = false;
    };
  }, []);

  const renderPosts = () => {
    return posts.map((post:Post) => (
      <div key={post.post_id} className="post">
        <h3>{post.content}</h3>
        <em>{post.post_date.toDateString()}</em>
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
