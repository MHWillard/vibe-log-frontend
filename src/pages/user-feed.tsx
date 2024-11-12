import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
//import { getPosts } from "../services/posts.service";
import { getPostsTest } from "../services/posts.service";

interface Post {
  post_table_id: number,
  userid: number,
  content: string,
  post_id: number,
  post_date: Date,
}

export const UserFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      console.log("mount")
    }

    const gatherPosts = async () => {
      try {
        const { data, error } = await getPostsTest()
        console.log("Fetched data:", data);
        console.log(error)

        if (!isMounted) {
          return;
        }

        if (Array.isArray(data)) {
          const postsData: Post[] = data.map((item: any) => ({
            content: item.content,
            post_date: new Date(item.post_date),
            post_id: item.post_id,
            post_table_id: item.post_table_id,
            userid: item.user_id,
          }));

          setPosts(postsData);
          console.log("Posts set to state:", postsData);
      } 
    } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    gatherPosts();
    //setPosts(postsData);
    //setError(error)

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
