const express =require('express');
const prorouter=express.Router();
const productmodel= require('../models/productmodel');

prorouter.get("/", async(req, res)=>{
    const result=await productmodel.find()
    res.json(result);
  })
 
 prorouter.delete("/",async(req, res)=>{
   const sid= req.body.sid;
 await productmodel.findOneAndDelete({_id:sid});
 res.json({msg:"delete successful"});
  })

  prorouter.get("/:id", async(req,res)=>{
    const de= await productmodel.find({catid:req.params.id})
    res.json(de);
   })
  
   prorouter.get("/:id", async(req,res)=>{
    const de= await productmodel.findOne({_id:req.params.id})
    res.json(de);
   })

   prorouter.get("/search/:id",async(req,res)=>{
    const s=req.params.id;
    let r = new RegExp(s);
    const dt=await productmodel.find({pname:r});
    res.json(dt);
  })

  prorouter.get("/match/:id",async(req,res)=>{
    const s=req.params.id;
    const f=await productmodel.findOne({_id:s});
    const name=f.pname;
     let r = new RegExp(name);
    const dt=await productmodel.find({pname:r});
    res.json(dt);
  })

  prorouter.get("/detail/:id", async(req,res)=>{
    const de= await productmodel.findOne({_id:req.params.id})
    res.json(de);
   })

   prorouter.get("/homedata",async(req,res)=>{
    const re=await productmodel.find();
    res.json(re);
   })

  module.exports=prorouter