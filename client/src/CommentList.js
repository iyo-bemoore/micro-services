import axios from 'axios';
import { useEffect, useState } from 'react';

const CommentList = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`http://posts.com/posts/${id}/comments`);
      setComments(res.data);
    };
    fetchComments();
  }, [id]);

  const renderedComments = comments.map(comment => {
    return <li key={comment.id}> {comment.content} </li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
