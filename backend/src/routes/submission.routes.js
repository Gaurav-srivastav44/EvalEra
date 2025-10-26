// routes/submissionRoutes.js

const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller');


router.post('/submit', submissionController.createSubmission);

router.get('/my', submissionController.getStudentSubmissions); 

module.exports = router;