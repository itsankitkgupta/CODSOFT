const mongoose= require('mongoose');
const catmodel= mongoose.model("category", new mongoose.Schema({
    cate:{type:String, required:true}
}));
module.exports=catmodel;