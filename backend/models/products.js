const mongoose=require('mongoose');

const product=mongoose.Schema({
    image:{type:String},
    vehicleName:{type:String, require:true},
    vehicleColor:{type:String, require:true},
    vehicleBrand:{type:String, require:true},
    vehicleCategory:{type:String, require:true},
    vehiclePrice:{type:Number, require:true},
    registeredCity:{type:String, require:true},
    engineCapacity:{type:String, require:true},
    ContactNumber:{type:String},
    Description:{type:String},
    sold:{type:Boolean, default:false},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }

})

module.exports=mongoose.model('products', product);