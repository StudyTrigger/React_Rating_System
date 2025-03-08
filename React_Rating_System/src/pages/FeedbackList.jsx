import React, { useEffect, useState } from "react";
import { fetchApprovedFeedbacks } from "../services/feedback.service";
import "../styles.css";

function FeedbackList(){
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = async () => {
      const data = await fetchApprovedFeedbacks();
      setFeedbacks(data);
  };

  return (
    <div className="feedback-list">
      <h2>Feedback List for User (Only approved feedbacks)</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Feedback</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan="3">No approved feedbacks yet.</td>
            </tr>
          ) : (
            feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
                <td>⭐ {feedback.rating}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
