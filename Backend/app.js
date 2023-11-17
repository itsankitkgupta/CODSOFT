const express = require('express');
const cors =require('cors');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const catrouter=require('./router/catrouter')
const multer=require('multer');
const productmodel = require('./models/productmodel');
const Signupmodel = require('./models/signupmodel');
const cartmodel = require('./models/cartmodel');
const Addresmodel = require('./models/addresmodel');
const Ordermodel = require('./models/Oredermodel');
const Orderdetail = require('./models/Orderdetail');
const catmodel = require('./models/categorymodel');
const prorouter = require('./router/prorouter');
const addressrouter = require('./router/addressrouter');
const cartrouter = require('./router/cartrouter');
const orderrouter = require('./router/orderrouter');
const orderdetrouter = require('./router/orderdetrouter');
const cookieParser=require('cookie-parser');
 const app= express();
app.use(express.static("propic"))
 const con =mongoose.connect("mongodb://127.0.0.1:27017/login");

 con.then(()=>{
    console.log("connection successfull");
 });
 con.catch(()=>{
    console.log("error");
 });

 app.use(cors({origin:true, credentials:true}));
 app.use(express.json());
 app.use(cookieParser());
app.use("/category",catrouter);
app.use("/product", prorouter);
app.use("/address", addressrouter);
app.use("/cart",cartrouter);
app.use("/order",orderrouter);
app.use("/orderdt",orderdetrouter);

app.post("/signup",async(req, res)=>{
  const ps=await bcrypt.hash(req.body.psw, 15);
  const email=req.body.email;
  const re= new Signupmodel({
    name:req.body.name,
    email:email,
    psw:ps,
    mobile:req.body.mobile
});

await re.save();
  res.cookie("mycookie",email).json({msg:"valid user"});
})

app.post("/login",async(req, res)=>{
  const em=req.body.email;
  const psw =req.body.psw;
  const result=await Signupmodel.findOne({email:em});
  if(result)
  {
    if(await bcrypt.compare(psw,result.psw))
    {
      res.cookie("mycookie",em).json({msg:"Valid user"});
    }else{
      res.json({msg:"invalid user"});
    }
  }else{
    res.json({msg:"invalid email"});
  }
})

 const mystorage=multer.diskStorage({
      destination:(req,file,cb)=>{
         cb(null,"./propic")
      },
      filename:(req,file,cb)=>{
         var ext=file.mimetype.split("/")[1];
         cb(null,"pic_"+Date.now()+"."+ext);
      }
 })

 const myfilter=(req,file,cb)=>{
      var ptype=file.mimetype.split("/")[1];
      if(ptype==="png" || ptype==="jpg" || ptype==="jpeg" || ptype==="bmp")
      {
         cb(null,true);
      }
      else
      {
            cb("Please select valid picture",false);
      }
 }

 const upload=multer({
   storage:mystorage,
   fileFilter:myfilter
 });

 app.post("/product",upload.single("pro_pic"),async(req,res)=>{
      const rec=new productmodel({
         catid:req.body.catid,
         pname:req.body.pname,
         price:req.body.price,
         offerprice:req.body.offerprice,
         description:req.body.description,
         pic:req.file.filename
      });
      await rec.save();
      res.json({msg:"Product Saved"})
 })

 app.listen(8080,()=>{
    console.log("server start");
 });