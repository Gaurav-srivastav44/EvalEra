// controllers/subjectController.js

const Subject = require('../models/Subject');
const User = require('../models/user.model'); 
const mongoose = require('mongoose');

// --- POST /api/subjects (Create Subject - NO SECURITY CHECK) ---
exports.createSubject = async (req, res) => {
    try {
        // NOTE: Since middleware is skipped, we expect adminId in the body for now.
        const { name, code, adminId } = req.body; 

        if (!name || !code || !adminId) {
            return res.status(400).json({ message: 'Name, code, and adminId are required.' });
        }
        
        // Basic check that user exists (and assuming they are a Teacher/Admin)
        const adminUser = await User.findById(adminId);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found.' });
        }

        const subject = await Subject.create({
            name,
            code,
            admin: adminId,
        });

        res.status(201).json({ message: 'Subject created successfully', subject });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Subject name or code already exists.' });
        }
        console.error('Error creating subject:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// --- GET /api/subjects (Read All Subjects - NO SECURITY CHECK) ---
exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('admin', 'name email role'); 
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
// Add other CRUD logic (getById, update, delete) here...