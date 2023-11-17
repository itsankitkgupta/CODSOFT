
import { useNavigate, useParams } from "react-router-dom";
import Cart from "./Cart";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Buy=()=>{

  const [cookie, setcookie, removecookie]=useCookies();
  const [data,setdata]=useState("");
  const [price, setprice]=useState("");
  const [length, setlength]=useState("");
  const [offer, setoffer]=useState("");
  const [amount, setamount]=useState("");
  const [record, setrecord]=useState("");
  const pr=useSelector((state)=>state.pricefun);
  const le=useSelector((state)=>state.length);
  const dispatch=useDispatch();
  const {id}=useParams();
const jump=useNavigate();
const changeadd=()=>{
  jump("/address")
}
useEffect(()=>{
  getaddres();
  getprice();
 
},[price]);

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
     id=re[i]._id+"__;"+id;
      
     setrecord(id);
      const t=total+offtotal;
      setprice(t);
      setlength(quant1);
      setoffer(offtotal);
      p=t-offtotal;
      dispatch({type:"pr", pitem:p});
      dispatch({type:"le", len:quant1});
    } 
  }
}
const getaddres=async()=>{
  if(id){
    const data1=await fetch("http://localhost:8080/address/"+id,{
      method:"GET",
      headers:{'Content-Type':'application/json'}
    })
  const re=await data1.json();
  setdata(re);
  }
  else if(cookie["mycookie"]){
    const data1=await fetch("http://localhost:8080/address/one/"+cookie["mycookie"],{
      method:"GET",
      headers:{'Content-Type':'application/json'}
    })
    const re=await data1.json();
    if(re){
      setdata(re); 
    }
  }
  else{
  document.getElementById("changeadd").innerHTML="Add new Address";
  
  }
}
const addresss=(data.name+"_;"+data.mobile+"_:"+data.address+""+data.city+","+data.state+","+data.pincode);
 const date1=new Date();
const ndate="Time:"+date1.getHours()+":"+date1.getMinutes()+":"+date1.getSeconds()+" Date: "+ date1.getDate() +"/" + date1.getMonth()+ "/" + date1.getDay();

 const orderconfirm=async()=>{
 const na=await fetch("http://localhost:8080/order",{
  method:"POST",
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({date:ndate,amount:amount,status:"pending", email:cookie["mycookie"],address:addresss})
 })
 const g=await na.json();
 
}
    return(<>
      <div className="row ">
         <div className="col-sm-7 m-5 ">
         <Cart/>
         </div>
         <div style={{height:250}} className="col-sm-3 shadow-lg m-5 bg-light">
            <label className="h3 w-100 p-3 border-bottom">Price detail</label>
            <div className="row border-bottom">
           <div className="col-sm-8 m-2">
           <label className="fs-5">Price({le}item)</label><br/>
           <label className="fs-5">discount</label><br/>
           <label className="fs-5">delivery charge</label>
           <label className="h4 mt-3 border-top w-100">Total payble</label>
           </div>
           <div className="col-sm-2 m-2  text-end">
            <label className="fs-5">{price}</label><br/>
            <label className="fs-5">{offer}</label><br/>
            <label className="fs-5">49</label><br/>
          <label className="h4 mt-3 w-100 border-top">{pr}</label>
           </div>
           <div className="mt-3 shadow-lg mb-1">
           <div className="bg-success fs-3 text-white"> Delivery Address</div>
           <div className="row">
           <div className="col-sm-9 bg-light">
            <label className="fs-4">{data.name}</label><br/>
             <label className="fs-5">{data.mobile}</label><br/>
             <label>{data.address}{data.city+", "}{data.state}{data.pincode}</label><br/>
                 </div>
           <div className="col-sm-3 bg-light text-center">
           <div id="changeadd" onClick={changeadd} className="change border border-dark text-success mt-1 rounded">change</div>
           </div>
           
           </div> 
          
           </div>
           
           </div>
           <div className="rowm mt-4">
         <button onClick={orderconfirm} data-bs-toggle="modal" data-bs-target="#myModal" className="btn btn-success p-2">Order confirm</button>
         </div>
         </div>
         
      </div>

      <div class="modal" id="myModal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header bg-success">
        <h3 class="modal-title text-light">Order Done</h3>
      </div>
      <div class="modal-body">
      <h4>Delivery coming soon</h4>
      </div>
      <div class="modal-footer">
        <button style={{marginRight:100}} type="button" class="btn btn-success" data-bs-dismiss="modal">Done</button>
      </div>

    </div>
    </div>
    </div>
    </>)
}
export default Buy;