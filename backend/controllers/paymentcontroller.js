// const payment = require('../models/payment');
const Payment=require('../models/payment');
const user=require('../models/registration');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


module.exports.paymentintegrate = async (req, res) => {
    try {
        console.log(req.body, "Request body");

        // Ensure that Price and packageName are present in the request body
        const { Price, packageName } = req.body;

        if (!Price || !packageName) {
            return res.status(400).json({ error: "Price and packageName are required" });
        }

        // Create the checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: packageName,
                        },
                        unit_amount: Price * 100, // Convert price to cents

                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/success/${packageName}`,
            cancel_url: 'http://localhost:5173/failed',
            // Optionally, you can set metadata for additional information
            // metadata: {
            //     packageName: packageName
            // }
        });

        console.log(session, "Created session");

        res.json({ sessionId: session.id }); // Send back the session ID to the client
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while creating the checkout session" });
    }
}






module.exports.addPayment = async (req, res) => {
    try {
        const userid=req.body.userId;
        const paymentCount = await Payment.countDocuments();
        
        if (paymentCount <= 0) {
            const addPayment = new Payment({ Revenue: 29 });
            const donePayment = await addPayment.save();
            
            if (donePayment) {
                const verifypayment=await user.findOneAndUpdate({_id:userid},{Payment:true});
                if(verifypayment){
                return res.send({ data: "true", message:"payment Added", status:200 });
                }
            } else {
                return res.status(500).send({ message: "Failed to add payment" });
            }
        } else {
            const updatepayment = await Payment.findOne({ Revenue: { $exists: true } });
            
            if (updatepayment) {
                updatepayment.Revenue += 29;
                const paymentSave = await updatepayment.save();
                
                if (paymentSave) {
                    const verifypayment=await user.findOneAndUpdate({_id:userid},{Payment:true});
                    if(verifypayment){
                    return res.send({ message: "Your payment is saved", status:200 });
                    }
                } else {
                    return res.status(500).send({ message: "Failed to save payment" });
                }
            } else {
                return res.status(404).send({ message: "No payment document found" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getpayments=async (req,res)=>{
    const userid=req.params.userid
    console.log(req.params.userid, "getpayment");
    try {
        const finduserpayment=await user.findOne({_id:userid});
        console.log(finduserpayment.Payment,"payment")
        if(finduserpayment.Payment==true){
        res.send({status:200, message:"payment found"});
        }else{
            res.send({status:404, message:"not found"});
        }
    } catch (error) {
        
    }
}