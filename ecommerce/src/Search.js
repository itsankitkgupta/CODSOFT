import { useParams } from "react-router-dom";
import Card from "./Card";
import { useEffect, useState } from "react";
import Nav from "./Nav";

const Search=()=>{
  const {id}=useParams();
  const [data,setdata]=useState([]);
 useEffect(()=>{
  getrecord();
 },[id]);

 const getrecord=async()=>{
  const re=await fetch("http://localhost:8080/product/search/"+id,{
    method:"GET",
    headers:{'Content-type':'application/json'}
  })
  const dt=await re.json();
   setdata(dt);
   console.log(dt);
 }
    return(<>
    <Nav/>
  <div className="row">
    {data.map((e)=>{
      return(
        <Card pic={"http://localhost:8080/"+e.pic} name={e.pname} off={e.offerprice} fake={e.offerprice} price={e.price} pid={e._id}/>
      )
    })}
    </div>
    </>)
}
export default Search;