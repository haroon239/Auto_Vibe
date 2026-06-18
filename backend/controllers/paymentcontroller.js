const Payment = require('../models/payment');
const user    = require('../models/registration');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ── Create Stripe Checkout Session ─────────────────────────
module.exports.paymentintegrate = async (req, res) => {
    try {
        console.log("KEY BEING USED:", process.env.STRIPE_SECRET_KEY);
        const { Price, packageName, userId } = req.body;

        if (!Price || !packageName || !userId) {
            return res.status(400).json({ 
                error: "Price, packageName and userId are required" 
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: packageName },
                    unit_amount: Price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            // ✅ pass userId in success URL
            success_url: `http://localhost:5173/success/${packageName}/${userId}`,
            cancel_url:  'http://localhost:5173/failed',
        });

        // ✅ return sessionId correctly
        res.status(200).json({ sessionId: session.id });

    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};

// ── Save Payment After Success ──────────────────────────────
module.exports.addPayment = async (req, res) => {
    try {
        const { userId, packageName, price } = req.body;

        if (!userId || !packageName || !price) {
            return res.status(400).json({ message: "userId, packageName and price are required" });
        }

        const purchasedAt = new Date();
        let expiresAt = null;

        if (packageName === "Basic") {
            // 24 hours
            expiresAt = new Date(purchasedAt.getTime() + 24 * 60 * 60 * 1000);
        } else if (packageName === "Professional") {
            // 30 days
            expiresAt = new Date(purchasedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
        } else if (packageName === "Premium") {
            expiresAt = null; // unlimited
        }

        // ✅ Always create new payment per user (not overwrite same doc)
        const newPayment = new Payment({
            userId,
            packageName,
            price: Number(price),
            purchasedAt,
            expiresAt,
            isActive: true
        });

        await newPayment.save();

        // Update user Payment status
        await user.findByIdAndUpdate(userId, { Payment: true });

        res.status(200).json({ message: "Payment saved successfully", status: 200 });

    } catch (error) {
        console.error("addPayment error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ── Check User Payment Status ───────────────────────────────
module.exports.getpayments = async (req, res) => {
    try {
        const { userid } = req.params;
        const foundUser  = await user.findById(userid);

        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (foundUser.Payment === true) {
            res.status(200).json({ status: 200, message: "Payment found" });
        } else {
            res.status(404).json({ status: 404, message: "No payment found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ── Get All Payments (Admin) ────────────────────────────────
module.exports.allpayments = async (req, res) => {
    try {
        const allPayments = await Payment.find()
            .populate('userId', 'fullname email username')
            .sort({ createdAt: -1 }); // newest first
        res.status(200).json(allPayments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};