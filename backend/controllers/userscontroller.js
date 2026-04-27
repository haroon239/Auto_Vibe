const mongoose=require('mongoose');
var nodemailer = require('nodemailer');
const users=require('../models/registration');
const product=require('../models/products');
const payment=require('../models/payment');
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
const Users = require('../models/registration');
const secret_key="finalyearproject";

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'haroon116butt@gmail.com',
        pass:"wnff vmvl ohik avsn"
    }
})

module.exports.signup=async (req, res)=>{
    try {
        console.log(req.body);
        const userbehaviour="buyer";
         const {fullname, username, email, password}=req.body;
         const becrypt_password=await bcrypt.hash(password,10);
        const user=await new users({fullname:fullname, username:username, email:email, behaviour:userbehaviour, password:becrypt_password, isvarified:false});
         await user.save();
         if(user){
            res.send({response:"data is stored successfully...", status:200});
            console.log("user............");
            const verifyemail=await users.findOne({email:email});
            console.log(verifyemail._id, "28");
    
            var mailOptions={
                    from:'haroon116butt@gmail.com',
                    to:email,
                    subject:'verify Mail',
                    text:"click this verify link",
                    html: `Please click the link <a href="http://localhost:6500/verifyemail/${verifyemail._id}">Verify</a> and verify your account`
                }
            
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            
            }
    } catch (error) {
        res.send(error);
    }

}

module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email: email });

        if (user) {
            // Compare passwords asynchronously
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    // Handle error
                    res.status(500).send('Error comparing passwords');
                } else if (result) {
                    // Passwords match, allow access
                    var token=jwt.sign({_id:user._id}, secret_key, { expiresIn: '1h' });
                    res.send({status:200,Token:token, response:'Password is correct. Allow access.', id:user._id, name:user.username});
                } else {
                    // Passwords do not match, deny access
                    res.send('Password is incorrect. Deny access.');
                }
            });
        } else {
            res.send('Email is not correct.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports.updateuser=async (req,res)=>{
    try {
        
        console.log(req.params, 3564);
        const userid=req.params.userid;
        const updateuser=await users.findOneAndUpdate({_id:userid},{behaviour:"seller"},{new:true});
        if (updateuser){
            res.send("user is update successfully...");
        }

    } catch (error) {
    
        res.send(error);
    }
}


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
        // res.send("hello world");
        console.log(req.params.userid); 
        const userId=req.params.userid;
        const isverified=await users.findOneAndUpdate({_id:userId},{isvarified:true})
        // Access route parameter 'userid'
        if(isverified){
            res.send("you are verified then go to login page");
            console.log("user verified");
        }
    } catch (error) {
        console.log(error);
    }
};




module.exports.AdminDashboard = async (req, res) => {
    try {
        const userid  = req.params.userid;

        console.log(userid)
        
        // Validate userId
        if (!userid) {
            return res.status(400).send({ message: "User ID is required" });
        }
        
        const isAdmin = await users.findOne({ _id: userid, Admin: true });
        
        if (isAdmin) {
            
            let revenue=await payment.find({Revenue:{$exists: true }});
            if(revenue.length==0){
                revenue=0
            }
            
            const totalusers= await users.countDocuments();
            const totalseller= await users.find({behaviour:"seller"}).countDocuments();
            const products = await product.countDocuments();
            const soldproduct=await product.find({sold:true}).count();
            return res.send({ message: "This is Admin",status:200, data: isAdmin,registerduser:totalusers, Seller:totalseller,  product: products, soldproduct:soldproduct, revenue:revenue });
        } else {
            return res.send({ message: "This is Not Admin", data: isAdmin , status:406});
        }
    } catch (error) {
        console.error("Error in AdminDashboard:", error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}
