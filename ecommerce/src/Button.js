import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Nav from "./Nav";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";



const Button =(x)=>{
  const [cookie, setcookie, removecookie]=useCookies();
const dispatch=useDispatch();
  const [quant, setquant]=useState("");

  useEffect(()=>{
    getquantity(x.pid);
  },[]);


  const loadquantity=async()=>{
    const dat=await fetch("http://localhost:8080/cart/getqty/"+cookie["mycookie"],{
      method:"GET",
      headers:{'Content-Type':'application/json'}
    })
    var total=0;
    const re=await dat.json();

    for(var i=0;i<re.length;i++)
    {
    total=total+parseInt(re[i].quantity);
    
    }
    dispatch({type:"GT",citem:total}) 
    
  }

const getquantity=async(a)=>{

  const re=await fetch("http://localhost:8080/cart/getquant/"+a,{
    method:"GET",
    headers:{'Content-Type':'application/json'}
  })
  const de=await re.json();
  if(de){
    setquant(de.quantity);
    
  }
}

const increquantity=async()=>{
  const str=parseInt(quant)+1;
  const update=await fetch("http://localhost:8080/cart/post/quant",{
   method:"POST",
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({quantity:str,sid:x.pid})
  })
  const up=await update.json();
getquantity(x.pid);
alert(quant);
loadquantity();
}

const decrquantity=async()=>{
  const str=parseInt(quant)-1;
  if(str===0){
    const del= await fetch("http://localhost:8080/cart/del/"+x.pid,{
       method:"DELETE",
       headers:{'Content-Type':'application/json'}
    })  

 }else{
  const update=await fetch("http://localhost:8080/cart/post/quant",{
   method:"POST",
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({quantity:str,sid:x.pid})
  })
  const up=await update.json();
getquantity(x.pid);
loadquantity();
 }
}

    return(<>
     <div className="row">
              <div onClick={decrquantity}  className="col-sm-3 fs-5 in text-center border border-dark rounded-circle">-</div>
               <div className="col-sm-5  mt-1 text-center">
              <label>{quant}</label>
               </div>
                <div onClick={increquantity} className="col-sm-3 fs-5 de border border-dark rounded-circle">+</div>
              </div>
    </>)
}
export default Button;