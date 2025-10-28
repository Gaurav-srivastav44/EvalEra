// middleware/accessControl.js

const accessControl = (allowedRoles) => (req, res, next) => {
    // Check if req.user (set by verifyToken) exists
    if (!req.user || !req.user.role) {
        // This should not happen if verifyToken ran, but acts as a safeguard
        return res.status(500).json({ message: 'Authorization error: User role not identified.' });
    }

    // Check if the user's role is included in the allowedRoles array
    if (allowedRoles.includes(req.user.role)) {
        next(); // Role is permitted, proceed
    } else {
        // 403: Forbidden - User is logged in, but lacks permission for this action
        return res.status(403).json({ 
            message: `Forbidden. Role '${req.user.role}' is not authorized to perform this action.` 
        });
    }
};

// Export specific role checkers for easy route use:
exports.isTeacherOrAdmin = accessControl(['Teacher', 'Admin']);
exports.isAdmin = accessControl(['Admin']);
exports.isStudent = accessControl(['Student']);
exports.isAnyAuthenticated = accessControl(['Student', 'Teacher', 'Admin']);