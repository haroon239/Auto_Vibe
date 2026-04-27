const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    fullname:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    behaviour:{type:String, required:true},
    password:{type:String, required:true},
    isvarified:{type:Boolean},
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    Payment:{type:Boolean, default:false},
    Admin:{type:Boolean, default:false}

},{timestamps:true})

const Users=mongoose.model('users',userschema);

module.exports=Users;