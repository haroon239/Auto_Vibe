// middlewares/auth.js
const jwt = require('jsonwebtoken');
const secret_key = "finalyearproject";

module.exports.verifyToken = (req, res, next) => {
    try {
        // Get token from request header
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ response: "No token. Access denied." });
        }

        // Verify token
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded; // { _id: user._id }
        next();

    } catch (error) {
        res.status(401).json({ response: "Invalid or expired token." });
    }
};