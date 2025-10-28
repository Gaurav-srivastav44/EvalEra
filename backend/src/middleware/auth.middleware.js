// middleware/auth.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get token from cookies
    const token = req.cookies.token; 

    if (!token) {
        // 401: Unauthorized - No token found
        return res.status(401).json({ message: 'Access Denied. Please log in.' });
    }

    try {
        // 2. Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach user data (id and role) to the request object
        req.user = decoded.user; 
        
        // 4. If valid, proceed to the next handler/middleware
        next(); 
    } catch (ex) {
        // 400: Bad Request - Token is invalid or expired
        return res.status(400).json({ message: 'Invalid token or session expired.' });
    }
};

module.exports = verifyToken;