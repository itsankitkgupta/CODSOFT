import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Address=()=>{

    const [frm, setfrm]=useState({name:"",pincode:"", mobile:"",address:"",city:"",state:"",mobile2:"",
    name1:"",pincode1:"",mobile1:"",address1:"",city1:"",state1:"",mobile21:""})
     const [cookie,setcookie,removecookie]=useCookies();
     const [data , setdata]=useState("");
     const [all, setall]=useState([]);
     const jump=useNavigate();
     var n1=useRef();

     const fun=(e)=>{
        setfrm({...frm,[e.target.id]:e.target.value});
        n1.current.style.borderColor="grey";
    }

    useEffect(()=>{
        
       alladdres();
      },[]);
      const getaddres=async(x)=>{
        setdata(x);
        const data1=await fetch("http://localhost:8080/address/"+x,{
          method:"GET",
          headers:{'Content-Type':'application/json'}
        })
      const re=await data1.json();
      console.log(re);
      if(re){
        setfrm({...frm, name1:re.name,pincode1:re.pincode, mobile21:re.mobile2,mobile1:re.mobile,city1:re.city,state1:re.state,address1:re.address});
      }
    }

    const saverecord=async()=>{
      if(frm.name==="")
      {
        //alert("Please enter name");
        n1.current.focus();
        n1.current.style.borderColor="red";
      }else if(frm.pincode===""){
        n1.current.focus();
        n1.current.style.borderColor="red";
      }else if(frm.mobile===""){
        n1.current.focus();
        n1.current.style.borderColor="red";
      }else if(frm.mobile2===""){
        n1.current.focus();
        n1.current.style.borderColor="green";
      }else if(frm.address===""){
        n1.current.focus();
        n1.current.style.borderColor="red";
      }else if(frm.city===""){
        n1.current.focus();
        n1.current.style.borderColor="red";
      }else if(frm.state===""){
        n1.current.focus();
        n1.current.style.borderColor="red";
      }
      else
      {
      const result =await fetch("http://localhost:8080/address",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:cookie["mycookie"], name:frm.name, pincode:frm.pincode,mobile:frm.mobile,address:frm.address,city:frm.city,state:frm.state,mobile2:frm.mobile2})
      })
      const re=await result.json();
      alert(re.msg);
      jump("/cart/buy");
      alladdres();
    }
    }
    const updaterecord=async()=>{
       const up=await fetch("http://localhost:8080/address/up/"+data,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:cookie["mycookie"],name:frm.name1, pincode:frm.pincode1,mobile:frm.mobile1,address:frm.address1,city:frm.city1,state:frm.state1,mobile2:frm.mobile21})
       })
       const re1=await up.json();
       alert(re1.msg);
       alladdres();
    }

    const alladdres=async()=>{
      const data1=await fetch("http://localhost:8080/address/all/"+cookie["mycookie"],{
        method:"GET",
        headers:{'Content-Type':'application/json'}
      })
    const re=await data1.json();
    setall(re);
    }

    const sendid=(e)=>{
      jump("/buy/"+e);
    }

    return(<>
    <div className=" m-2 p-3 ">
      <div style={{width:"80%"}} className="text-end ">
        <button className="btn btn-success"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Add new Address</button>
        </div>
        {all.map((e)=>{
          return(
            <div style={{width:"80%"}} className="row shadow-lg m-3 bg-light">
          <div className="col-sm-9">
          <h3>Name:{e.name}</h3>
          <label className="fs-5">Mobile no:{e.mobile}</label><br/>
          <label className="fs-5">Address:{e.address}{e.city}{e.state}{e.pincode}</label>
        </div>
        <div className="col-sm-3">
          <button className="btn btn-warning mt-4 m-2" onClick={()=>{getaddres(e._id)}} data-bs-toggle="modal" data-bs-target="#myModal1">Edit</button>
          <button className="btn btn-success mt-4 m-2" onClick={()=>{sendid(e._id)}}>Select address</button>
        </div>
        </div>
          )
        })}
        </div>

    <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add new Address</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
      <div className="row " >
        <div className="col-sm-6">
            <label>Name</label>
            <input className="form-control" id="name" ref={n1}  onChange={fun} placeholder="Enter name"></input>
            <label>Pincode</label>
            <input className="form-control"id="pincode" ref={n1} onChange={fun} placeholder="Enter pincode"></input>
        </div>
        <div className="col-sm-6">
        <label>Mobile No.</label>
         <input className="form-control"id="mobile" ref={n1}  onChange={fun} placeholder="Enter Mobile No."></input>
         <label>City/distric/Town</label>
            <input className="form-control" id="city" ref={n1}  onChange={fun} placeholder="Enter city/distric/Town"></input>
          
         </div>
        <label className=" ">Address</label>
         <textarea  className="form-control m-2" ref={n1}   id="address" onChange={fun} placeholder="Address (Area and Street)" rows="3"/>
        </div>
        <div id="" className="row ">
        <div className="col-sm-6">
        <label>State</label>
         <input className="form-control" id="state" ref={n1}  onChange={fun} placeholder="Enter State"></input>
         </div>
         <div className="col-sm-6">
         <label>Alternate phone no.</label>
            <input className="form-control" id="mobile2" ref={n1}   onChange={fun} placeholder="Enter phone no."></input>
        </div>
        </div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" onClick={saverecord}>Save</button>
      </div>
    </div>
    </div>
   </div>

   <div class="modal" id="myModal1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Update Address</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
      <div className="row " >
        <div className="col-sm-6">
            <h3>change Address</h3>
            <label>Name </label>
            <input className="form-control" id="name1" value={frm.name1} onChange={fun} placeholder="Enter name"></input>
            <label>Pincode</label>
            <input className="form-control"id="pincode1" value={frm.pincode1} onChange={fun} placeholder="Enter pincode"></input>
        </div>
        <div className="col-sm-6">
        <label>Mobile No.</label>
         <input className="form-control"id="mobile1" value={frm.mobile1} onChange={fun} placeholder="Enter Mobile No."></input>
         <label>City/distric/Town</label>
            <input className="form-control" value={frm.city1} id="city1" onChange={fun} placeholder="Enter city/distric/Town"></input>
          
         </div>
        <label className=" ">Address</label>
         <textarea  className="form-control m-2" value={frm.address1} id="address1" onChange={fun} placeholder="Address (Area and Street)" rows="3"/>
        </div>
        <div className="row ">
        <div className="col-sm-6">
        <label>State</label>
         <input className="form-control" id="state1" value={frm.state1} onChange={fun} placeholder="Enter State"></input>
         </div>
         <div className="col-sm-6">
         <label>Alternate phone no.</label>
            <input className="form-control" id="mobile21" value={frm.mobile21} onChange={fun} placeholder="Enter phone no."></input>
        </div>
        </div>
      </div>
      <div class="modal-footer">
        <div className="row text-center">
        <button type="button" class="btn btn-success" onClick={updaterecord} >Update</button>
      </div>
      </div>
    </div>
  </div>
</div>

   
    
    </>)
}
export default Address;