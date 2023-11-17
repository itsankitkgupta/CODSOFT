const express=require('express');
const orderdetrouter=express.Router();
const Orderdetail=require('../models/Orderdetail');

orderdetrouter.get("/:id",async(req,res)=>{
    const r=await Orderdetail.find({orderno:req.params.id});
    res.json(r);
  })

  module.exports=orderdetrouter

  