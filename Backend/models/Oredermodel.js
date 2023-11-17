const mongoose=require('mongoose');
const Ordermodel=mongoose.model("Order",new mongoose.Schema({
    orderno:{type:String,required:true},
    date:{type:String,required:true},
    email:{type:String,required:true},
    amount:{type:String,required:true},
    status:{type:String,required:true},
    address:{type:String, required:true}
}))
module.exports=Ordermodel