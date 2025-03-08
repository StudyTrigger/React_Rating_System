import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchAllFeedbacks, approveFeedback, deleteFeedback } from "../services/feedback.service";
import FeedbackList from "./FeedbackList"
import "../styles.css";

Modal.setAppElement("#root");

function AdminPanel() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllFeedbacks();
  }, [filter]);

  const getAllFeedbacks = async () => {
    const data = await fetchAllFeedbacks(filter);
    setFeedbacks(data);
  };

  const handleApprove = async (id) => {
    await approveFeedback(id);
    getAllFeedbacks();
  };

  const handleDelete = async (id) => {
    await deleteFeedback(id);
    getAllFeedbacks();
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await submitFeedback(email, feedback, rating);
      setMessage(result.message);
      
      if (result.success) {
        setEmail("");
        setFeedback("");
        setRating(5);
      }
  };

  return (
    <>
    <div>
      <div className="admin-panel">
      <h2>Feedback List for Admin</h2>

      <div className="controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>

          <button className="add-feedback" onClick={() => setIsModalOpen(true)}>Add Feedback</button>
        </div>

      {/* Feedback Table */}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan="5">No feedbacks found</td>
            </tr>
          ) : (
            feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.email}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.status}</td>
                <td>
                  {feedback.status === "pending" && (
                    <button className="approve" onClick={() => handleApprove(feedback._id)}>Approve</button>
                  )}
                  <button className="delete" onClick={() => handleDelete(feedback._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <FeedbackList />
    </div>
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal">
          <div className="modal-content">
            <h2>Submit Feedback</h2>
            {message && <p className="success">{message}</p>}
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <textarea placeholder="Your feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
              <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" className="close-btn" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </Modal>
    </div>
    </>
  );
};

export default AdminPanel;
