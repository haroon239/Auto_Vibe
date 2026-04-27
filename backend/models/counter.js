const mongoose=require('mongoose');
const products = require('./products');

const click= mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:products},
    click:{type:Number,default:1},
    like:{type:Number, default:1}
})

module.exports=mongoose.model('productClick',click);