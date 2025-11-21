// Create Server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const subjectRoutes = require('./routes/subject.routes');
const assignmentRoutes = require('./routes/assignment.routes');
const submissionRoutes = require('./routes/submission.routes');

const app = express()

app.use(cookieParser());
app.use(express.json());//Middleware gives data to req.body it makes data readable

app.get("/" , (req,res) =>{
    res.send("Hello World");
})
app.use("/api/auth" , authRoutes)//telling server API exists
app.use("/api/subjects", subjectRoutes)
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);

module.exports = app;