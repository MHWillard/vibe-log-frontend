import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { getPosts } from "../services/posts.service";
import ReactPaginate from 'react-paginate';

interface Post {
  post_table_id: number,
  userid: number,
  content: string,
  post_id: number,
  post_date: Date,
}

export const UserFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  //const [currentPage, setCurrentPage] = useState(0);
  //const [totalPages, setTotalPages] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
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

  /*
  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  */
  const endOffset = itemOffset + postsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentPosts = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / postsPerPage);

  const paginate = (e:any) => {
    /*
    setCurrentPage(selectedPage.selected);
    console.log("startIndex: " + startIndex)
    console.log("endIndex: " + endIndex)
    console.log("currentPosts: " + currentPosts)
    console.log("currentPage: " + currentPage)
    */
    const newOffset = (e.selected * postsPerPage) % posts.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    console.log("current posts:" + currentPosts)
    console.log("pageCount: " + pageCount)
    setItemOffset(newOffset);
  }

  const renderPosts = () => {
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
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={paginate}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </div>
      </div>
    </PageLayout>
  );
};
