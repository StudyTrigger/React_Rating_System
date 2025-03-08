import React, { useState } from "react";
import {submitFeedback} from "../services/feedback.service"

function FeedbackForm(){
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

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
    <div>
      <h2>Submit Feedback</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Your feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
