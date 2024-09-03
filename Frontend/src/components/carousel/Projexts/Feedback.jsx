import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feedback.scss";
import avatar from "../../../assets/avatar.png"; // Placeholder avatar image

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);

  const projectId = "66aa8b86ec331872d8b599dc"; // Retrieve projectId from URL parameters
  const userId = "134c971e-6785-49e3-9371-3ee3acc714d3"; // Retrieve userId from local storage

  useEffect(() => {
    // Fetch comments when the component mounts
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/comments/project/${projectId}`
        );
        console.log("fetched comments are:", response.data);

        setFeedbackList(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // New feedback object
    const newFeedback = {
      userId,
      projectId,
      comment: feedbackText,
      rating, // Including rating if it's required
    };

    try {
      // Send POST request to the backend
      const response = await axios.post(
        `http://localhost:5000/api/comments`,
        newFeedback
      );

      // Add the new feedback to the feedback list
      console.log("Comment added successfully:", response.data);

      setFeedbackList([response.data, ...feedbackList]);
      setFeedbackText("");
      setRating(0); // Reset rating after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally, handle the error (e.g., display a message to the user)
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="feedback">
      <h3 className="feedback-title">Leave Feedback</h3>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <textarea
          className="feedback-input"
          placeholder="Write your feedback here..."
          rows="4"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>
        <div className="feedback-rating">
          <span>Rate:</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className="feedback-button">
          Submit
        </button>
      </form>
      <div className="feedback-list">
        <h3 className="feedback-list-title">Recent Feedback</h3>
        {feedbackList.map((feedback, index) => (
          <div className="feedback-item" key={feedback.id || index}>
            <div className="feedback-info">
              <img src={avatar} alt="Profile" className="feedback-avatar" />
              <div>
                <div className="feedback-user">{`${index + 1}. ${
                  feedback.user
                }`}</div>
                <div className="feedback-time">{feedback.updatedAt}</div>
              </div>
            </div>
            <div className="feedback-text">{feedback.comment}</div>
            <div className="feedback-rating">Rating: {feedback.rating} ★</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
