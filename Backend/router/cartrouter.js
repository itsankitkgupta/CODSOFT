const express=require('express');
const cartrouter =express.Router();
const cartmodel=require('../models/cartmodel');

cartrouter.get("/check/:pid",async(req,res)=>{
    const ch=await cartmodel.findOne({pid:req.params.pid,email:req.cookies.mycookie});
  
    if(ch)
    {
        res.json({"citem":"yes"})
    }
    else
    {
        res.json({"citem":"no"})
    }

  })
  
  cartrouter.get("/getall/:email", async(req,res)=>{
   const re= await cartmodel.find({email:req.params.email});
   res.json(re);
  })

  cartrouter.get("/getprice/:email", async(req,res)=>{
    const re= await cartmodel.find({email:req.params.email});
    res.json(re);
   })

  cartrouter.post("/", async(req,res)=>{
    await cartmodel.findOneAndUpdate({_id:req.body.sid}, {quantity:req.body.quant});
    res.json({msg:"update record"});
    })
  
   cartrouter.post("/post",async(req,res)=>{
    const re=await cartmodel.findOneAndUpdate({_id:req.body.sid},{quantity:req.body.quantity})
    res.json({msg:"update successfull"})
   })

   cartrouter.post("/post/quant",async(req,res)=>{
    const re=await cartmodel.findOneAndUpdate({pid:req.body.sid},{quantity:req.body.quantity})
    res.json({msg:"update successfull"})
   })


   cartrouter.get("/getqty/:email",async(req,res)=>{
    const de=await cartmodel.find({email:req.params.email});
    res.json(de);
   })
  
   cartrouter.delete("/:id", async(req, res)=>{
    await cartmodel.findOneAndDelete({_id:req.params.id});
    res.json({msg:"delete successfull"});
   })

   cartrouter.delete("/del/:id", async(req, res)=>{
    await cartmodel.findOneAndDelete({pid:req.params.id});
    res.json({msg:"delete successfull"});
   })
  
   cartrouter.get("/:id", async(req,res)=>{
    const re=await cartmodel.findOne({_id:req.params.id});
    res.json(re);
    
   })
  
   cartrouter.get("/getquant/:pid",async(req,res)=>{
    const de=await cartmodel.findOne({pid:req.params.pid});
    res.json(de);
   })
  
   cartrouter.post("/save/", async(req,res)=>{
   const re1=await cartmodel.find({pid:req.body.pid,email:req.body.email});
   if(re1.length>0)
    {
      const qty=parseInt(re1[0].quantity)+1;
       const cid=re1[0]._id;
      await cartmodel.findOneAndUpdate({_id:cid},{quantity:qty})
      res.json({msg:"data update"});
    }
    else{
    const re=new cartmodel({
      name:req.body.name,
      price:req.body.price,
      offerprice:req.body.offerprice,
      pic:req.body.pic,
     email:req.body.email,
     pid:req.body.pid,
     quantity:"1"
    })
    await re.save();
    res.json({msg:"data saved"});
   }
   })
module.exports=cartrouter  