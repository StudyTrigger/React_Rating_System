const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ratingSystem')
    .then(() => console.log('rating system connected'))
    .catch((err) => console.log(err));

const feedbackSchema = new mongoose.Schema({
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    approvalDate: { type: Date, default: null }
});

const Feedback = mongoose.model('Feedback', feedbackSchema, 'Feedback');

// 1. Submit Feedback
app.post('/feedback/submit', async (req, res) => {
    try {
        const { email, feedback, rating } = req.body;
        const newFeedback = new Feedback({ email, feedback, rating });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted!', feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting feedback' });
    }
});

// 2. Get Pending Feedback
app.get('/feedback/pending', async (req, res) => {
    try {
        const pendingFeedbacks = await Feedback.find({ status: 'pending' });
        res.json(pendingFeedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pending feedback' });
    }
});

// 3. Approve Feedback
app.put('/feedback/approve/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, {
            status: 'approved',
            approvalDate: new Date()
        }, { new: true });

        res.json({ message: 'Feedback approved!', feedback });
    } catch (error) {
        res.status(500).json({ error: 'Error approving feedback' });
    }
});

// 4. Disapprove Feedback (Delete)
app.delete('/feedback/disapprove/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: 'Feedback disapproved and removed!' });
    } catch (error) {
        res.status(500).json({ error: 'Error disapproving feedback' });
    }
});

// 5. Get Approved Feedback
app.get('/feedback/approved', async (req, res) => {
    try {
        const approvedFeedbacks = await Feedback.find({ status: 'approved' });
        res.json(approvedFeedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching approved feedback' });
    }
});

app.get('/feedback/all', async (req, res) => {
    try {
        const allFeedbacks = await Feedback.find();
        res.json(allFeedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all feedbacks' });
    }
});

// Start Server
app.listen(8000, () => console.log("Server running on port 8000"));
