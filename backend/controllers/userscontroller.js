const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
const users = require('../models/registration');
const product = require('../models/products');
const payment = require('../models/payment');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Users = require('../models/registration');
const secret_key = "finalyearproject";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        const userbehaviour = "buyer";
        const { fullname, username, email, password } = req.body;

        // Check for duplicate email or username
        const existing = await users.findOne({ $or: [{ email }, { username }] });
        if (existing) return res.status(409).json({ response: 'Email or username already exists.' });

        const becrypt_password = await bcrypt.hash(password, 10);

        const user = new users({
            fullname: fullname,
            username: username,
            email: email,
            behaviour: userbehaviour,
            password: becrypt_password,
            isvarified: false
        });

        await user.save();

        if (user) {
            res.status(200).json({ response: "Data is stored successfully. Please verify your email.", status: 200 });

            console.log("user............");

            const verifyemail = await users.findOne({ email: email });
            console.log(verifyemail._id, "28");

            var mailOptions = {
                from: 'haroon116butt@gmail.com',
                to: email,
                subject: 'Verify Mail',
                text: "Click this verify link",
                html: `Please click the link <a href="${process.env.BASE_URL}/api/users/verifyemail/${verifyemail._id}">Verify</a> and verify your account`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });

        if (!user) return res.status(404).json({ response: 'Email not found.' });
        if (!user.isvarified) return res.status(403).json({ response: 'Please verify your email.' });

        const result = await bcrypt.compare(password, user.password);
        if (!result) return res.status(401).json({ response: 'Incorrect password.' });

        const token = jwt.sign({ _id: user._id }, secret_key, { expiresIn: '1h' });
        res.status(200).json({ token, id: user._id, name: user.username });

    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

module.exports.updateuser = async (req, res) => {
    try {
        const userid = req.params.userid;
        const updateuser = await users.findOneAndUpdate(
            { _id: userid }, 
            { behaviour: "seller" }, 
            { new: true }
        );
        if (updateuser) {
            res.status(200).send("User updated successfully.");
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports.likedproduct = async (req, res) => {
    console.log(req.body);
    const product = req.body.Product;

    try {
        const user = await users.findOne({ _id: req.body.userid });

        if (!user) {
            // If user not found, send a 404 response
            return res.status(404).send("User not found");
        }

        const liked = await users.updateOne({ _id: req.body.userid }, { $addToSet: { likedProducts: product } });

        if (liked) {
            // If nModified is greater than 0, the update was successful
            res.send("Liked product will be added in the Database");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



module.exports.likedproductlist = async (req, res) => {
    try {
        // Log request body for debugging
        console.log(req.body);

        // Check if userid is provided in request body
        if (!req.body.userid) {
            return res.status(400).send("User ID is required in request body");
        }

        // Find the user by ID and populate the likedProducts field
        const result = await users.findOne({ _id: req.body.userid }).populate('likedProducts');

        // Check if user is found
        if (!result) {
            return res.status(404).send("User not found");
        }

        // Send response with liked products
        return res.status(200).send({ message: "Liked products found successfully", likedProducts: result.likedProducts });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};


// remove liked product from product list

module.exports.removelikedproduct = async (req, res) => {
    console.log(req.body, "reo");
    const product = req.body.productid;

    try {
        const user = await users.findOne({ _id: req.body.userid });

        if (!user) {
            // If user not found, send a 404 response
            return res.status(404).send("User not found");
        }

        const liked = await users.updateOne({ _id: req.body.userid }, { $pull: { likedProducts: product } });

        if (liked) {
            // If nModified is greater than 0, the update was successful
            res.status(200).send("Liked product will be Remove in the Database");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports.userverify = async (req, res) => {
    try {
        console.log(req.params.userid);
        const userId = req.params.userid;

        const isverified = await users.findOneAndUpdate(
            { _id: userId },
            { isvarified: true },
            { new: true }
        );

        if (isverified) {
            console.log("user verified");
            res.redirect('http://localhost:5173/signin');
        } else {
            res.status(404).send("User not found.");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Verification failed.");
    }
};




module.exports.AdminDashboard = async (req, res) => {
    try {
        const userid = req.params.userid;

        console.log(userid)

        // Validate userId
        if (!userid) {
            return res.status(400).send({ message: "User ID is required" });
        }

        const isAdmin = await users.findOne({ _id: userid, Admin: true });

        if (isAdmin) {

            const payments = await payment.find();
            const totalRevenue = payments.reduce((sum, p) => sum + (p.price || 0), 0);

            const totalusers = await users.countDocuments();
            const totalseller = await users.find({ behaviour: "seller" }).countDocuments();
            const products = await product.countDocuments();
            const soldproduct = await product.find({ sold: true }).count();
            return res.send({ message: "This is Admin", status: 200, data: isAdmin, registerduser: totalusers, Seller: totalseller, product: products, soldproduct: soldproduct, revenue: totalRevenue });
        } else {
            return res.send({ message: "This is Not Admin", data: isAdmin, status: 406 });
        }
    } catch (error) {
        console.error("Error in AdminDashboard:", error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}




// ── Get All Users (Admin) ───────────────────────────────────
module.exports.allusers = async (req, res) => {
    try {
        const allUsers = await users.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ── Delete User (Admin) ─────────────────────────────────────
module.exports.deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};