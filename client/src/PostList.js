import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('http://posts.com/posts');
      setPosts(response.data);
    };
    getPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
        </div>
        <CommentList id={post.id} />
        <CommentCreate id={post.id} />
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
};

export default PostList;
