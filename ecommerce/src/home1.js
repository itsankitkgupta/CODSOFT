 import Bottom from "./Bottom"
import Nav from "./Nav"
import Card from "./Card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const Home1=()=>{
    const [data, setdata]=useState([]);
    const [quant,setquant]=useState("");
    const [cookie, setcookie, removecookie]=useCookies();
    useEffect(()=>{
        getrecord();
      
    },[]);

    const getquantity=async()=>{
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
      setquant(total);
    }

  const getrecord=async()=>{
    const reuslt= await fetch("http://localhost:8080/product",{
     method:"GET",
     headers:{'Content-Type':'application/json'}
    })
    const rs=await reuslt.json();
    setdata(rs);
   

  }
    return(<>
    
    <div className="bg">
        <div className="w-100">
          <Nav/>
        </div>
        <div className="container-fluide">
        <div className="row">
        <div className="col-sm-5 d-flex text-white h1 justify-content-center pt-5">
            <div className="w-100 pt-5 text-center mt-5">
                <label>Singing song </label>
                <label>live us luxuries life</label><br/>
               <button className="mt-5 btnbuy">Buy now</button>
               <div  className=" pt-5 mt-5 ps-5">
                <i  className="fa fa-facebook border fb m-2 border-dark p-2 mt-5 rounded-circle"></i>
                <i className="fa fa-instagram border ins m-2 border-dark p-2 mt-5 rounded-circle"></i>
                <i className="fa fa-twitter border tw m-2 border-dark p-2 mt-5 rounded-circle"></i>
                <i className="fa fa-linkedin border li m-2 border-dark p-2 mt-5 rounded-circle"></i>
               </div>
            </div><br/>
            </div>
        <div className="col-sm-6 pt-3 mt-5 cir2">
      <div className=" cir ps-5 pt-2">
      <img className="headimg " src="headpng.png"/>
      </div>
        </div>
        </div> 
    </div>
    </div>
    <Bottom/>
   <div className="pt-5 cardd"></div>
    <div  className="row mt-5 pt-5">
        {data.map((e)=>{
          return(
            <Card name={e.pname} pic={"http://localhost:8080/"+e.pic} fake={e.offerprice} off={e.offerprice} price={e.price} pid={e._id}/>
          )
        })}
   </div>
    </>)
}
export default Home1