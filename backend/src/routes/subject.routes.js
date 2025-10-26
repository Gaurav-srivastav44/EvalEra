// routes/subjectRoutes.js

const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller');


router.post('/subject/creation', subjectController.createSubject);


router.get('/subject/allsubjects', subjectController.getAllSubjects);

module.exports = router;