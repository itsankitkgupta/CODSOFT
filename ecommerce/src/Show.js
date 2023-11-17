import { useParams } from "react-router-dom";
import Card from "./Card"
import Nav from "./Nav";
import { useEffect, useState } from "react";

const Show=()=>{
   const {id}=useParams();
   const [data, setdata]=useState([]);
   useEffect(()=>{
    loadproducts();
   },[data]);

   const loadproducts=async()=>{
    
        const result = await fetch("http://localhost:8080/product/"+id,{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        })
        const re=await result.json();
        setdata(re);
       console.log(re);
   }
return(
    <>
    <div className="container-fluid">
        <Nav/>
    <div className="row">
        {data.map((e)=>{
            return(
                <Card pic={"http://localhost:8080/"+e.pic} off={e.offerprice} fake={e.offerprice} name={e.pname} price={e.price} pid={e._id} />
            )
        })}
     </div>
    </div>
    </>
)
}

export default Show;