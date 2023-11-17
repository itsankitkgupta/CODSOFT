import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import Card from "./Card";

const Detailcard=()=>{
    const {id}=useParams();
    const [data, setdata]=useState({});
    const [data2, setdata2]=useState([]);
        
    useEffect(()=>{
        loadproduct();
       getrecord();
       
    },[]);

    const loadproduct=async()=>{
        const result=await fetch("http://localhost:8080/product/detail/"+id,{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        })
        const re=await result.json();
        setdata(re);
    }
    const jump =useNavigate();
    const addcart=()=>{
    alert()
    }

    const getrecord=async()=>{
        console.log();
        const reuslt= await fetch("http://localhost:8080/product/match/"+id,{
         method:"GET",
         headers:{'Content-Type':'application/json'}
        })
        const rs=await reuslt.json();
        setdata2(rs);
    }
    
    return(
        <>
        <Nav/>
        <div className="shadow-lg mb-2 m-1 bg-light">
       <div className="row">
        <div className="col-sm-5 text-end bg-light">
            <div >
            <img src={"http://localhost:8080/"+data.pic} className=" h-80 w-75 border"/>
            </div>
            <div className="row mt-3 mb-5 p-3 ">
            <button  className="col-sm-5 btn btn-warning fs-4 m-1" onClick={addcart}>add to cart</button>
            <button  className="col-sm-6 btn btn-success fs-4 m-1">Buy now</button>
            </div>
        </div>
                <div className="col-sm-7 ">
                <div>
                <label className="h3">{data.pname}</label><br/>
                <label style={{color:'#808080'}} className=" m-2">Trusted Product</label><br/>
                <label className="h1">₹{data.price}</label>&nbsp;
                <del style={{color:'#808080'}} className="fs-5">{data.offerprice}</del>&nbsp;
                <label className="text-success"> 80% off</label> <br/>
                <lobel className="fs-5 text-primary" >Delivery charge:  ₹50</lobel> 
                <div className="h2">Product detail:</div>
                <p className="fs-3">{data.description}</p>
                <label className="h3">Offers:</label>
                   <p className="fs-5 text-success">pay online off 10%</p>
                   <div className="row ">
                    <div className="col-sm-3 ">
                   <input className=" form-control" placeholder="Enter delivery pincode"/>
                   </div>
                   <button className="col-sm-2 border btn btn-white m-0 text-primary">check</button>
                   
                   </div>
                   <label className="fs-5 m-2 text-success"> Delivery to 5 Aug</label>
                   <div className="row border">
                   <label className="col-sm-1 mt-4 h5">Color:</label>
                   <div className="col-sm-10">
                    <div className="row">
                   <img className="col-sm-2 m-1 h-50 border" src={"http://localhost:8080/"+data.pic}></img>
                   <img className="col-sm-2 m-1 h-50 border" src={"http://localhost:8080/"+data.pic}></img>
                   <img className="col-sm-2 m-1 h-50 border" src={"http://localhost:8080/"+data.pic}></img>
                   <img className="col-sm-2 m-1 h-50 border" src={"http://localhost:8080/"+data.pic}></img>
                   </div>
                   </div>
                   </div> 
                   <div style={{width:200}}>
                   <table className="table table-bordered mt-3 text-black">
                    <tbody>
                        <tr>
                            <td>model: </td>
                            <td>headphone </td>
                        </tr>
                        <tr>
                            <td>Bluetooth </td>
                            <td>5.0</td>
                        </tr>
                        <tr>
                            <td>mic: </td>
                            <td>Yes </td>
                        </tr>
                        <tr>
                            <td>color</td>
                            <td>black</td>
                        </tr>
                    </tbody>
                   </table>
                   </div>
                   <div  className="row">
                    <div className="col-sm-3 m-2">
                        <img className=" h-75 w-100" src={require('./images/R.jpg')}/>
                    </div>
                    <div className="col-sm-3 m-2 mt-5">
                        <img className=" h- w-75 w-100" src={require("./images/cash.jpg")}/>
                    </div>
                    <div className="col-sm-3 m-2 pt-3">
                        <img className=" h-50 w-75 mt-4" src={require('./images/replace.jpg')}/>
                        <label>7 days replacement</label>
                    </div>
                   </div>
                   </div> 
            </div>
        </div>
       </div>
       <div className="row">
        {data2.map((e)=>{
          return(
            <Card name={e.pname} pic={"http://localhost:8080/"+e.pic} fake={e.offerprice} off={e.offerprice} price={e.price} pid={e._id}/>
          )
        })}
   </div>
        </>
    )
}
export default Detailcard;