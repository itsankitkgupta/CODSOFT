import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Address from "./Address";
import { useDispatch, useSelector } from "react-redux";


const Cart=()=>{
   const pr=useSelector((state)=>state.pricefun);
   const len=useSelector((state)=>state.length);
  const dispatch=useDispatch();
   const jump=useNavigate();
   const gobuy=()=>{
jump("/cart/buy")

   }

useEffect(()=>{
   getrecord();
  
},[]);
   
   const [record, setrecord]=useState([]);
   const [cookie, setcookie, remove]=useCookies();

   const getprice=async()=>{
      const get=await fetch("http://localhost:8080/cart/getprice/"+cookie["mycookie"],{
        method:"GET",
        headers:{'Content-Type':'application/json'}
      })
      var re=await get.json();
      var total=0;
      var offtotal=0;
      var id="";
     var qty=0
      var tt=0;
      var quant1=0;
      var p=0;
      if(re){
        
        for(var i=0;i<re.length;i++){
          qty=parseInt(re[i].quantity);
          quant1=qty+quant1;
         tt=parseInt(re[i].price)*qty;
         total=tt+total;
          offtotal=parseInt(re[i].offerprice)+offtotal;
        
          const t=total+offtotal;
      
          p=t-offtotal;
          dispatch({type:"pr", pitem:p});
          dispatch({type:"le", len:quant1})
        } 
      }
    }

   const getrecord=async()=>{
      const result=await fetch("http://localhost:8080/cart/getall/"+cookie["mycookie"],{
         method:"GET",
         headers:{'Content-Type':'application/json'}
      })
      const re=await result.json();
      setrecord(re);
     
   }
   const increquantity=async(e,q)=>{
     const str=parseInt(q)+1;
     const update=await fetch("http://localhost:8080/cart/post",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({quantity:str,sid:e})
     })
     const up=await update.json();
    getprice();
     getrecord();
   }

   const decrquantity=async(x,qe)=>{
      const de=parseInt(qe)-1;
      if(de===0){
         const del= await fetch("http://localhost:8080/cart/"+x,{
            method:"DELETE",
            headers:{'Content-Type':'application/json'}
         })
         const d= await del.json();
         alert(d.msg);
         getrecord();
         
      }
     const decre=await fetch("http://localhost:8080/cart",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({quant:de, sid:x})
     })
     const re=await decre.json();
     getrecord();
     getprice();
   }

   const deleterecord=async(x)=>{
      const result = await fetch("http://localhost:8080/cart/"+x,{
         method:"DELETE",
         headers:{'Content-Type':'application/json'},
      })
      const re = await result.json();
      alert(re.msg);
      getrecord();
   }

    return(<>
   
    {record.map((e)=>{
      return(
      <div className="container row shadow-lg rounded m-2 bg-light">
     <div className="col-sm-3">
        <img className="w-75 h-75 border p-1 m-1" src={e.pic}/><br/>
        <button className="btn btn-white border rounded-circle m-1" onClick={()=>{decrquantity(e._id, e.quantity)}}>-</button>
        <label className=" border p-2">{e.quantity}</label>
        <button className="btn btn-white border rounded-circle m-1" onClick={()=>{increquantity(e._id,e.quantity)}}>+</button>
     </div>
     <div className="col-sm-4">
        <label className="mt-2 w-100 fs-4"> {e.name}</label>
        <label>black color</label><br/>
        <label className="text-success">{e.offerprice}<del style={{color:'#808080'}} className="">1000</del></label><br/>
            <label className="text-black fs-5">{e.price}</label><br/>
        <button id="delete" className="btn btn-white border m-4 text-primary" onClick={()=>{deleterecord(e._id)}}>Remove</button>
     </div>
     <div className="col-sm-3">
        <label className="fs-3 mt-4">Delivery:</label>
        <label className="fs-4">3 Aug to 5 Aug</label>
     </div>
     
    </div>
      )
    })}
    <div className="row ">
      <div className="col-sm-1"></div>
      <div className="col-sm-8">
         <div className="row">
         <button id="order1" className="btn btn-success fs-5" onClick={gobuy}>Order Now</button>
         </div>
      
      </div>
     
     </div>
    </>)
}
export default Cart;