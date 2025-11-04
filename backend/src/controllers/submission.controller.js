// controllers/submissionController.js

const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');

// --- POST /api/submissions (Student submits assignment - NO AUTH) ---
exports.createSubmission = async (req, res) => {
    try {
        // IMPORTANT: Since middleware is skipped, we take studentId from the body.
        const { assignmentId, submittedPath, studentId } = req.body; 

        // 1. Basic Validation
        if (!assignmentId || !submittedPath || !studentId) {
            return res.status(400).json({ message: 'Assignment ID, submitted path, and studentId are required.' });
        }

        // 2. Check Assignment existence and Due Date
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment || !assignment.isPublished) {
            return res.status(404).json({ message: 'Assignment not found or not published.' });
        }

        // Check for late submission
        const dueDate = new Date(assignment.dueDate);
        const submissionTime = new Date();
        const isLate = submissionTime > dueDate;

        // 3. Prevent duplicate submission
        const existingSubmission = await Submission.findOne({ assignment: assignmentId, student: studentId });
        if (existingSubmission) {
            return res.status(409).json({ message: 'You have already submitted this assignment.' });
        }

        // 4. Create Submission
        const newSubmission = await Submission.create({
            assignment: assignmentId,
            student: studentId,
            submittedPath,
            isLate: isLate,
            status: 'Pending'
        });

        res.status(201).json({ 
            message: `Submission successful. Status: ${isLate ? 'Late' : 'Pending'}`,
            submission: newSubmission 
        });

    } catch (error) {
        // Handle MongoDB unique key error (duplicate submission attempt)
        if (error.code === 11000) {
             return res.status(409).json({ message: 'Duplicate submission attempt.' });
        }
        console.error('Error creating submission:', error);
        res.status(500).json({ message: 'Server error while creating submission.' });
    }
};

// --- GET /api/submissions/my (Get all submissions by a student - NO AUTH) ---
exports.getStudentSubmissions = async (req, res) => {
    try {
        // IMPORTANT: Since middleware is skipped, we take studentId from the body (query param).
        // In the final version, this will be req.user.id
        const studentId = req.query.studentId; 

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required.' });
        }
        
        const submissions = await Submission.find({ student: studentId })
            .populate('assignment', 'title dueDate') // Assignment ka title load karna
            .sort({ createdAt: -1 });

        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error fetching student submissions:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};