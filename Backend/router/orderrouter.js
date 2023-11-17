const express=require('express');
const orderrouter=express.Router();
const Ordermodel =require('../models/Oredermodel');
const cartmodel =require('../models/cartmodel');
const Orderdetail =require('../models/Orderdetail');

orderrouter.get("/:email",async(req,res)=>{
    const re=await Ordermodel.find({email:req.params.email});
    res.json(re);
  })
 
  
  orderrouter.post("/",async(req,res)=>{
    const no="ORD"+Date.now();
    const de=new Ordermodel({
      orderno:no,
      amount:req.body.amount,
      status:req.body.status,
      date:req.body.date,
      email:req.body.email,
      address:req.body.address
    })
    await de.save();
   const re= await cartmodel.find({email:req.body.email});
    for(var i=0;i<re.length;i++){
      const pname=re[i].name;
      const price=re[i].price;
      const pic=re[i].pic;
      const quantity=re[i].quantity;
     const sa=new Orderdetail({
      orderno:no,
      pname:pname,
      price:price,
      pic:pic,
      quantity:quantity,
     })
     await sa.save();
    }
  
    res.json({msg:"save record"});
  })
  

module.exports=orderrouter