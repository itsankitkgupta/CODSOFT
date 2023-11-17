const express =require('express');
const addressrouter=express.Router();
const Addresmodel=require('../models/addresmodel');

addressrouter.post("/",async(req,res)=>{
    const re=new Addresmodel({
      name:req.body.name,
      pincode:req.body.pincode,
      address:req.body.address,
      mobile:req.body.mobile,
      mobile2:req.body.mobile2,
      state:req.body.state,
      city:req.body.city,
      email:req.body.email
    })
    await re.save();
    res.json({msg:"data saved"});
  })
  
addressrouter.put("/up/:id",async(req,res)=>{
    await Addresmodel.findOneAndUpdate(
      {_id:req.params.id},
      {name:req.body.name,email:req.body.email,city:req.body.city,state:req.body.state,mobile2:req.body.mobile2,pincode:req.body.pincode,address:req.body.address,mobile:req.body.mobile},
    )
    res.json({msg:"data update"});
  })
  
  addressrouter.get("/:id",async(req,res)=>{
    const dat=await Addresmodel.findOne({_id:req.params.id});
    res.json(dat);
  })
  
 addressrouter.get("/one/:email",async(req,res)=>{
    const dat=await Addresmodel.findOne({email:req.params.email});
    res.json(dat);
  })
  
  addressrouter.get("/all/:email",async(req,res)=>{
    const dat=await Addresmodel.find({email:req.params.email});
    res.json(dat);
  })
  
module.exports=addressrouter