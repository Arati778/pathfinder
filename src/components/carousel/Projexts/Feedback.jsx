import React, { useState } from "react";
import "./Feedback.scss";
import avatar from "../../../assets/avatar.png"; // Placeholder avatar image

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0); // State for rating, default 0
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, user: "John Doe", time: "1 hour ago", text: "This is a great component! Well done!", rating: 5 },
    { id: 2, user: "Jane Smith", time: "2 hours ago", text: "I really like the design. Simple and effective.", rating: 4 },
    // Add more dummy feedback items as needed
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (simulated adding new feedback)
    const newFeedback = {
      id: Date.now(),
      user: "Anonymous", // You can change this to the logged-in user's name if available
      time: "Just now",
      text: feedbackText,
      rating: rating,
    };
    setFeedbackList([newFeedback, ...feedbackList]);
    setFeedbackText("");
    setRating(0); // Reset rating after submission
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
        {feedbackList.map((feedback) => (
          <div className="feedback-item" key={feedback.id}>
            <div className="feedback-info">
              <img
                src={avatar}
                alt="Profile"
                className="feedback-avatar"
              />
              <div>
                <div className="feedback-user">{feedback.user}</div>
                <div className="feedback-time">{feedback.time}</div>
              </div>
            </div>
            <div className="feedback-text">{feedback.text}</div>
            <div className="feedback-rating">Rating: {feedback.rating} ★</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
