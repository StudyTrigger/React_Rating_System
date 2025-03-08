import axios from "axios";

const API_URL = "http://localhost:8000/feedback";

export const fetchAllFeedbacks = async (status) => {
    try {
      let url = `${API_URL}/all`;
      if (status === "pending") url = `${API_URL}/pending`;
      if (status === "approved") url = `${API_URL}/approved`;
  
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      return [];
    }
  };

// export const fetchAllFeedbacks = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/all`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching all feedbacks:", error);
//     }
// };

export const fetchPendingFeedbacks = async () => {
  try {
    const response = await axios.get(`${API_URL}/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending feedbacks:", error);
    return [];
  }
};

export const fetchApprovedFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_URL}/approved`);
      return response.data;
    } catch (error) {
      console.error("Error fetching approved feedbacks:", error);
    }
};

export const approveFeedback = async (id) => {
  try {
    await axios.put(`${API_URL}/approve/${id}`);
  } catch (error) {
    console.error("Error approving feedback:", error);
  }
};

export const deleteFeedback = async (id) => {
  try {
    await axios.delete(`${API_URL}/disapprove/${id}`);
  } catch (error) {
    console.error("Error deleting feedback:", error);
  }
};

export const submitFeedback = async (email, feedback, rating) => {
    try {
      await axios.post(`${API_URL}/submit`, { email, feedback, rating });
      return { success: true, message: "Feedback submitted successfully!" };
    } catch (error) {
      return { success: false, message: "Error submitting feedback!" };
    }
};
