import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:4000/posts/${id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <button>Upvote</button>
        <span>{post.votes}</span>
        <button>Downvote</button>
      </div>
      <div>
        <h3>Comments</h3>
        {post.comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
