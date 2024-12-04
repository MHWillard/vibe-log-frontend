interface Post {
    post_table_id: number,
    userid: number,
    content: string,
    post_id: number,
    post_date: Date,
  }

const PostFeed = ({posts}:{posts:Post[]}) => {

  const totalFeed = posts.map((post:Post) => (
    <div key={post.post_id} className="feed-post">
      <em className='feed-post-date'>{post.post_date.toDateString()}</em>
      <p className='feed-post-content'>{post.content}</p>
    </div>
    
))

    return (
      <div>
        {totalFeed}
    </div>
    )
}

export default PostFeed 