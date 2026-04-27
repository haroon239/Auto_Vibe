const counter = require('../models/counter');
const users=require('../models/registration');


module.exports.productclick = async (req, res) => {
    const body = req.body;

    try {

        const user=await users.findOne({
            _id:req.body.userId,
            likedProducts:req.body.product
        })


        const alreadyProduct = await counter.findOne({ product: req.body.product })
        if (!alreadyProduct) {
            const addClickOnProduct = new counter(body);
            const savedData = await addClickOnProduct.save();
            if (savedData) {
                res.status(201).json({ message: 'Data stored successfully' });
            } else {
                res.status(500).json({ message: 'Failed to store data' });
            }
        } else {
            // console.log(alreadyProduct.click,"...clicks...")

            if(req.body.behaviour=="click"){
            alreadyProduct.click += 1;
            }
            if(req.body.behaviour=="dislike"){
                alreadyProduct.like -= 1; 
                if (alreadyProduct.like < 0) alreadyProduct.like = 0;
            }
            if(!user && req.body.behaviour=="like"){
           
                alreadyProduct.like += 1;  
            }
           
            await alreadyProduct.save();
           
                console.log(user,"user.....")
            res.send({ message: 'Data Increment' });
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getclick= async (req, res)=>{
    const productId=req.params.productId
    // console.log(req.params.productId,"mmmmmmmmmmm");
try {
    const findclick = await counter.findOne({ product: productId })
    if(findclick){
        res.send({message:"click found", data:findclick});
    }else{
        res.send({message:"Wrong productId"})
    }
} catch (error) {
    res.send(error);
}
}
