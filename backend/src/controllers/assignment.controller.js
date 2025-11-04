// controllers/assignmentController.js

const Assignment = require('../models/Assignment');
const Subject = require('../models/Subject');
const Concept = require('../models/Concept');
// User is required for validation checks (optional but good practice)
const User = require('../models/user.model'); 
const mongoose = require('mongoose');

// --- POST /api/assignments (CREATE Assignment - Protected by Teacher/Admin) ---
exports.createAssignment = async (req, res) => {
    try {
        // creatorId is derived from the JWT payload set by verifyToken middleware
        const creatorId = req.user.id; 
        
        // Data from request body
        const { title, subjectId, dueDate, contentPath, contentType, relatedConcepts } = req.body; 

        // 1. Basic Validation
        if (!title || !subjectId || !dueDate || !contentType) {
            return res.status(400).json({ message: 'Title, subject ID, due date, and content type are required.' });
        }

        // 2. Validate Subject and Concepts existence
        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return res.status(404).json({ message: 'Subject not found.' });
        }
        
        // Validate Concepts (ensure all provided Concept IDs exist)
        if (relatedConcepts && relatedConcepts.length > 0) {
            const conceptsExist = await Concept.countDocuments({ '_id': { $in: relatedConcepts } });
            if (conceptsExist !== relatedConcepts.length) {
                 return res.status(400).json({ message: 'One or more concepts are invalid.' });
            }
        }

        // 3. Create the Assignment
        const newAssignment = await Assignment.create({
            title,
            creator: creatorId, // Use ID from authenticated user
            subject: subjectId,
            dueDate,
            contentPath,
            contentType,
            relatedConcepts,
            isPublished: true // Default to published on creation
        });

        res.status(201).json({ 
            message: 'Assignment created successfully.', 
            assignment: newAssignment 
        });

    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Server error while creating assignment.' });
    }
};

// --- GET /api/assignments (READ All Assignments - Role-based view) ---
exports.getAllAssignments = async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};

        // 🚨 CORRECTED LOGIC: Teacher/Admin see ALL assignments, Student sees only PUBLISHED 🚨
        if (role === 'Student') {
            // Student: Only sees assignments that are published
            query.isPublished = true;
        } 
        // For Teacher and Admin, query remains {} (empty), allowing them to see all.
        // This fixes the issue of Teachers only seeing their own assignments.

        const assignments = await Assignment.find(query)
            .populate('subject', 'name code') // Load subject details
            .populate('creator', 'name email role') // Load creator details
            .sort({ dueDate: 1 });
        
        res.status(200).json(assignments);

    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// --- DELETE /api/assignments/:id (DELETE Assignment - Protected by Teacher/Admin) ---
exports.deleteAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const userId = req.user.id; 

        const assignment = await Assignment.findById(assignmentId);
        
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found.' });
        }

        // Check Ownership: Only the creator (Teacher) or an Admin can delete it.
        // We assume middleware already confirmed the user is Teacher/Admin, but we check ownership.
        if (assignment.creator.toString() !== userId && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this assignment.' });
        }

        await Assignment.deleteOne({ _id: assignmentId }); 
        // NOTE: Real application mein submissions aur evaluations ko bhi delete karna hoga.

        res.status(200).json({ message: 'Assignment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting assignment:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
// PUT/PATCH (Update Assignment) function would follow a similar structure.