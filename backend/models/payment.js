const mongoose=require('mongoose');
const Users = require('./registration');
const payment = mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: Users },
    Revenue: { type:Number, default: 0 },
    expireAt: { type: Date, default: Date.now, expires:0 } // Expire after 15 days
});
module.exports=mongoose.model('payment',payment);