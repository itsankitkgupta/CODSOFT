import { useNavigate } from "react-router-dom";
import Detailcard from "./Detailcard";
import {useCookies} from 'react-cookie';
import { useEffect, useState } from "react";
import Button from "./Button";
import Addcart from "./Addcart";

const Card=(x)=>{
    const jump=useNavigate();
    const [quant, setquant]=useState("");
    const [cookie,setcookie,removecookie]=useCookies();
    const [data, setdata]=useState("");
   
    useEffect(()=>{
      check(x.pid);
    },[]);
   // <button id="btncart" className="col-sm-5 m-1 btn btn-success text-center" onClick={()=>{gocart(x.name,x.off,x.price,x.pic,x.pid)}}>add_cart</button>
          
    const check=async(a)=>{
      const ch=await fetch("http://localhost:8080/cart/check/"+a,{
        method:"GET",
        headers:{'Content-type':'applicaiton/json'},
        credentials:"include"
      });
      const w=await ch.json();    
      setdata(w.citem);
    
    }

    

   const product=(e)=>{
     jump("/detailcard/"+e);
   }

   const gocart=async(name,offerprice, price,pic, pid)=>{
    setquant(pid);
    if(!cookie["mycookie"])
    {
      jump('/login');
    }else{
     const de=await fetch("http://localhost:8080/cart/save",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:cookie["mycookie"],name:name,price:price, pic:pic, offerprice:offerprice, pid:pid})
     })
     const re=await de.json();
     alert(re.msg);
     check(x.pid);
    }
   }

   const buynow=async(name,offerprice, price,pic, pid)=>{
    if(!cookie["mycookie"])
    {
      jump('/login');
    }else{
     const de=await fetch("http://localhost:8080/cart/save",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:cookie["mycookie"],name:name,price:price, pic:pic, offerprice:offerprice, pid:pid})
     })
     const re=await de.json();
     jump("/cart/buy");
    }
   }
  
    return(<>
    <div style={{width:180}}  className="text-center card  shadow-lg mb-1 bg-white m-3 rounded">
            <div onClick={()=>{product(x.pid)}}>
            <img src={x.pic} style={{width:160,height:180, paddingTop:4}} /><br/>
            <label className="fs-5">{x.name}</label><br/>
            <label className="text-success">{x.off} <del style={{color:'#808080'}} className="">{x.fake}</del></label>&nbsp;
            <label className="text-black fs-5">₹{x.price}</label>
            </div>
            <div className="row text-center ">
            <div id="btn" className="col-sm-6 m-1 ">
            {data==="no"?<Addcart name={x.name} pic={x.pic}  off={x.off} price={x.price} pid={x.pid} />:<Button pid={x.pid} />}
            </div>
              <button className="col-sm-4 m-1 btn btn-warning" onClick={()=>{buynow(x.name,x.off,x.price,x.pic,x.pid)}}>Buy</button>
            </div>
            
    </div>
    </>)
}
export default Card;