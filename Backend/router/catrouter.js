const express=require('express');
const catrouter=express.Router();
const catmodel = require('.././models/categorymodel');

catrouter.put("/",async(req, res)=>{
    await catmodel.findOneAndUpdate({_id:req.body.sid},{cate:req.body.cate})
    res.json({msg:"update successful"});
  })

  catrouter.get("/category/:id", async(req, res)=>{
    const re=await catmodel.find();
    res.json(re);
  })
 
  catrouter.get("/:id", async(req, res)=>{
    const re=await catmodel.findOne({_id:req.params.id})
    res.json(re);
  })
 
  catrouter.post("/",async(req, res)=>{
   const data= new catmodel({
   cate:req.body.cate
   });
  await data.save();
   res.json({msg:"data saved"});
  })
 
  
  catrouter.get("/", async(req, res)=>{
    const data = await catmodel.find()
    res.json(data);
  })
 
  catrouter.delete("/",async(req, res)=>{
    const sid= req.body.sid;
    await catmodel.findOneAndDelete({_id:sid});
    res.json({msg:"delete successful"});
  })

  module.exports=catrouter