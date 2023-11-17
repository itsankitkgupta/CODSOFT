import {useCookies} from 'react-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const Addcart=(x)=>{
    const jump=useNavigate();
    const [quant, setquant]=useState("");
    const [cookie,setcookie,removecookie]=useCookies();

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
         jump("/cart");
         
        }
       }
    return(
        <>
        <div className='row text-center'>
             <button className="btn btn-success text-center" onClick={()=>{gocart(x.name,x.off,x.price,x.pic,x.pid)}}>add_cart</button>
             </div>
        </>
    )
}
export default Addcart;