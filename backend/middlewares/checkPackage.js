// middleware/checkPackage.js
const payment = require('../models/payment');

module.exports.checkPackage = async (req, res, next) => {
    try {
        const userId = req.user._id; // from JWT middleware

        const userPayment = await payment.findOne({ 
            userId: userId, 
            isActive: true 
        });

        // No package found
        if (!userPayment) {
            return res.status(403).json({ 
                response: "No active package. Please buy a package first." 
            });
        }

        // Premium — unlimited, skip expiry check
        if (userPayment.expiresAt === null) {
            return next();
        }

        const now = new Date();

        // Package expired
        if (now > userPayment.expiresAt) {
            // mark as inactive
            await payment.findByIdAndUpdate(userPayment._id, { isActive: false });

            return res.status(403).json({ 
                response: "Your package has expired. Please renew." 
            });
        }

        // Package is active — attach to request
        req.userPackage = userPayment;
        next();

    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};