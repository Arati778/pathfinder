import React from 'react';
import { Rate } from 'antd';

const FeedbackComponent = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Rate />
      <form className="feedback-form text-white" style={{ marginBottom: "20px" }}>
        <label htmlFor="feedback">Leave your feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          rows="4"
          cols="50"
          style={{
            width: "96%",
            padding: "8px",
            boxSizing: "border-box",
            marginBottom: "12px",
            backgroundColor: "#212529",
            color: "white",
          }}
          // Add any necessary state or handlers for feedback submission
        ></textarea>
        <br />
        <button
          type="submit"
          style={{
            backgroundClip: "#007bff",
            color: "gray",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </form>
      {/* You can display existing feedback here */}
      <div className="existing-feedback text-white" style={{ marginTop: "10px" }}>
        <p>User1: Great platform!</p>
        <p>User2: Enjoying the experience.</p>
        {/* Add more feedback entries as needed */}
      </div>
    </div>
  );
};

export default FeedbackComponent;
