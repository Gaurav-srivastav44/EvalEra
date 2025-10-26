# 🚀 EvalEra Backend API Documentation (Core v1)

**Base URL:** `/api`
**Status:** All models and core Controllers/Routes implemented.

---

## 1. Authentication & Access (Security Entry)

| Method | Endpoint | Description | Middleware/Security | Controller |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/auth/user/register` | Naye user (Student/Teacher) ka registration. | None (Public) | `authController.registerUser` |
| **POST** | `/auth/user/login` | User login aur JWT cookie generation. | None (Public) | `authController.loginUser` |
| **GET** | `/auth/user/logout` | User session end karna aur cookie clear karna. | None (Public) | `authController.logoutUser` |

---

## 2. Subject & Utility Management (Admin/Teacher Setup)

| Method | Endpoint | Description | Middleware/Security | Controller |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/subjects` | Naya Subject banana. | `verifyToken`, `isTeacherOrAdmin` | `subjectController.createSubject` |
| **GET** | `/subjects` | Sabhi Subjects ki list dekhna. | `verifyToken`, `isAnyAuthenticated` | `subjectController.getAllSubjects` |
| **GET** | `/subjects/:id` | Single Subject ki details dekhna. | `verifyToken`, `isAnyAuthenticated` | `subjectController.getSubjectById` |
| **POST** | `/concepts` | Subject ke andar naya Concept banana. | `verifyToken`, `isTeacherOrAdmin` | `conceptController.createConcept` |
| **GET** | `/concepts/subject/:id`| Ek Subject ke saare Concepts dekhna. | `verifyToken`, `isAnyAuthenticated` | `conceptController.getConceptsBySubject` |
| **GET** | `/plans` | Available Subscription Plans dekhna. | `verifyToken`, `isAnyAuthenticated` | `planController.getPlans` (TBD) |

---

## 3. Assignment Management (Teacher Workflow)

| Method | Endpoint | Description | Middleware/Security | Controller |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/assignments` | Naya Assignment create karna aur publish karna. | `verifyToken`, `isTeacherOrAdmin` | `assignmentController.createAssignment` |
| **GET** | `/assignments` | Assignments ki list dekhna (Teacher: apne, Student: published). | `verifyToken`, `isAnyAuthenticated` | `assignmentController.getAllAssignments` |
| **GET** | `/assignments/:id` | Single Assignment ki details (content) dekhna. | `verifyToken`, `isAnyAuthenticated` | `assignmentController.getAssignmentById` (TBD) |
| **PUT** | `/assignments/:id` | Assignment ko update karna (e.g., due date badalna). | `verifyToken`, `isTeacherOrAdmin` | `assignmentController.updateAssignment` (TBD) |
| **DELETE** | `/assignments/:id` | Assignment ko delete karna (Only Creator/Admin). | `verifyToken`, `isTeacherOrAdmin` | `assignmentController.deleteAssignment` |

---

## 4. Submission & Evaluation (Core Workflow)

| Method | Endpoint | Description | Middleware/Security | Controller |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/submissions` | Student dwara Assignment submit karna (File/Link upload). | `verifyToken`, `isStudent` | `submissionController.createSubmission` |
| **GET** | `/submissions/my` | Logged-in Student dwara apni saari Submissions dekhna. | `verifyToken`, `isStudent` | `submissionController.getStudentSubmissions` |
| **GET** | `/evaluation/assignments/:id/submissions` | Teacher dwara Assignment ke saare Submissions ki list dekhna. | `verifyToken`, `isTeacherOrAdmin` | `evaluationController.getSubmissionsForAssignment` |
| **POST** | `/evaluation/:submissionId` | Submission ko grade karna, score dena, aur feedback (Teacher/AI). | `verifyToken`, `isTeacherOrAdmin` | `evaluationController.gradeSubmission` |
| **GET** | `/evaluation/:submissionId` | Submission ka final Evaluation (Score, Feedback) dekhna. | `verifyToken`, `isAnyAuthenticated` | `evaluationController.getEvaluationBySubmissionId` (TBD) |

---

**Next Step:** Ab jab aapke paas poora API structure hai, toh hum **security** par wapas aate hain. Aapko pehle **`middleware/auth.js`** aur **`middleware/accessControl.js`** files bana kar unhein saari routes mein lagana hoga (jaisa **Middleware/Security** column mein bataya gaya hai).