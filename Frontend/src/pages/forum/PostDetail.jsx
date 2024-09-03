import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './postdetail.scss';

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to store the post data
  const [newComment, setNewComment] = useState(''); // State for the new comment
  const [comments, setComments] = useState([]); // State to store comments

  // Fetch the post data from the backend when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
        setComments(response.data.comments); // Initialize comments state
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  // Handle new comment input change
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // Handle new comment submission
  const handleCommentSubmit = async (event) => {
    event.preventDefault(); // Prevent form default behavior
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${id}/comments`, {
        body: newComment
      });
      setComments([...comments, response.data]); // Add new comment to the comments list
      setNewComment(''); // Clear the input field
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>; // Show loading state while data is being fetched

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta">
          <span className="subreddit">r/{post.subreddit}</span> • 
          <span className="author">Posted by u/{post.author}</span> • 
          <span className="timestamp">{post.timestamp}</span>
        </div>
      </div>
      
      <div className="post-body">
        <p>{post.body}</p>
      </div>

      <div className="post-votes">
        <button className="vote-button upvote">▲ Upvote</button>
        <span className="vote-count">{post.votes}</span>
        <button className="vote-button downvote">▼ Downvote</button>
      </div>

      <div className="post-comments">
        <h3>Comments</h3>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PostDetail;
