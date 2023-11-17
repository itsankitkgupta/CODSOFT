const mongoose=require('mongoose');
 const Orderdetail=mongoose.model("Orderdetail",new mongoose.Schema({
    orderno:{type:String,required:true},
    pname:{type:String,required:true},
    pic:{type:String,required:true},
    price:{type:String,required:true},
    quantity:{type:String,required:true}
 }))
 module.exports=Orderdetail