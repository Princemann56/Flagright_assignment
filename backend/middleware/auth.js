const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'No token provided, access forbidden' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log('Decoded token:', decoded);
        req.user = decoded.user; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
