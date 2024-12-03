import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { getPosts } from "../services/posts.service";
//import ReactPaginate from 'react-paginate';

interface Post {
  post_table_id: number,
  userid: number,
  content: string,
  post_id: number,
  post_date: Date,
}

export const UserFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      console.log("mount")
    }

    const gatherPosts = async () => {
      try {
        const { data, error } = await getPosts()
        //console.log("Fetched data:", data);
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
          //console.log("Posts set to state:", postsData);
          //setTotalPages(Math.ceil(postsData.length / postsPerPage));
      } 
    } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    gatherPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  console.log(totalPages);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    //probably need to update currentPost slice too
  };

  const renderPosts = () => {
    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);
    console.log("first: "+ indexOfFirstItem);
    console.log("last: " + indexOfLastItem);
    console.log("currentPosts: " + currentPosts);

    return currentPosts.map((post:Post) => (
      <div key={post.post_id} className="feed-post">
        <em className='feed-post-date'>{post.post_date.toDateString()}</em>
        <p className='feed-post-content'>{post.content}</p>
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
          <div className="post-feed">
          {renderPosts()}
          </div>
        </div>
        <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      </div>
    </PageLayout>
  );
};
