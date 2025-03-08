**Feedback Management System**
A full-stack Feedback Management System built with Node.js, React, and MongoDB, allowing users to submit feedback with ratings, while admins can review, approve, or delete feedback.

**Project Structure**
This system is divided into **two parts**:

**1. Rating_System_Node (Backend - API)**
🔹 Contains all the backend code to handle API requests and communicate with MongoDB.
🔹 Includes a mock_data.json file that you can import into MongoDB.

  **Setup for Backend**
  Navigate to the Rating_System_Node folder.
  Install dependencies:npm install
  
  **Set up MongoDB:**
  Create a database named ratingSystem
  Create a collection named Feedback
  Import mock_data.json into MongoDB. This file is present inside this directory.

  **Start the backend server: node index**

**2. React_Rating_System (Frontend - UI)**
🔹 Contains all the frontend code built with React.
🔹 Includes a Services folder to handle API communication with the backend.

  **Setup for Frontend**
  Navigate to the React_Rating_System folder.
  Install dependencies:
  Start the frontend server: npm run dev

**Features**
✅ Users can submit feedback with ratings and comments
✅ Admins can approve, reject, or delete feedback
✅ Feedback is categorized as pending or approved
✅ Responsive and user-friendly UI
✅ Data is stored securely using MongoDB

**Tech Stack**
🟢 Frontend: React.js
🟢 Backend: Node.js, Express.js
🟢 Database: MongoDB

**Screenshots :**

![image](https://github.com/user-attachments/assets/d5ae8049-140d-4e07-915f-37d8c1721317)


![image](https://github.com/user-attachments/assets/b3f3d140-94e6-41b1-8067-10c8162a658f)


