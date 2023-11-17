import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp=()=>{
    const [frm,setfrm]=useState({name:"", mobile:"", email:"", psw:""});

     const fun=(e)=>{
        setfrm({...frm, [e.target.id]:e.target.value})
     }
     const jump= useNavigate();
     const saverecord=async()=>{
        const result=await fetch("http://localhost:8080/signup", {
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({name:frm.name, email:frm.email, mobile:frm.mobile, psw:frm.psw})
        })
        const re=await result.json();
      if(re.msg==="valid user"){
          jump('/home1');
      }
        setfrm({name:"",mobile:"", email:"", psw:""});
     }
    
     const fun1=()=>{
        jump('/login');
     }
    
return(
    <>
    <div className="container-fluid back">
    <div className='row r'>
    <div className='col-sm-4'>&nbsp;</div>
    <div className='col-sm-4 mt-5'>
        <div className="shadow-lg p-4 m-3">
        <div className='text-center'>
           <h1>SignUp</h1>
        </div>
        <div className="form-group">
            <label>Full name</label>
            <input className="form-control" value={frm.name} onChange={fun} id="name" placeholder="Enter full name"/>
        </div>
        <div className="form-group pt-2">
            <label>Mobile no.</label>
            <input className="form-control" value={frm.mobile} onChange={fun} id="mobile" placeholder="Enter mobile no."/>
        </div>
        <div className="form-group pt-2">
            <label>Email</label>
            <input className="form-control" value={frm.email} onChange={fun} id="email" placeholder="Enter email"/>
        </div>
        <div className="form-group pt-2">
            <label>Password</label>
            <input className="form-control" type="password" value={frm.psw} id="psw" onChange={fun} placeholder="Enter password"/>
        </div>
        <div className="text-center mt-4">
            <button className="btn btn-success" onClick={saverecord}>Signup</button>
        </div>
        <div className="text-end mt-2">
            <label >Already have account? <label onClick={fun1} className="text-success login">Login</label></label>
        </div>
        </div>
    </div>
    <div className='col-sm-4'>&nbsp;</div>
    </div>
    </div>
    </>
)
}
export default SignUp;
