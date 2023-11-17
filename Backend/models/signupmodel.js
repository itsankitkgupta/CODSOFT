const mongoose= require('mongoose');
const Signupmodel=mongoose.model("Signup", new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:String, required:true},
    psw:{type:String, required:true}
}));
module.exports=Signupmodel