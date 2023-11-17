const mongoose=require('mongoose');
const cartmodel=mongoose.model("cart", new mongoose.Schema({
    name:{type:String, required:true},
    pic:{type:String, required:true},
    price:{type:String, required:true},
    offerprice:{type:String, required:true},
    email:{type:String, required:true},
    quantity:{type:String, required:true},
    pid:{type:String, required:true}
}))
module.exports=cartmodel