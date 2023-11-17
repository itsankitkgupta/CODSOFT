import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import bk from './bk.jpg';

function App() {
  const [frm, setfrm]=useState({email:"", psw:""});

   const fun=(e)=>{
    setfrm({...frm,[e.target.id]:e.target.value});
   }
const jump =useNavigate();

const signup=()=>{
  jump('/signup');
}
  const saverecord=async()=>{
    const result =await fetch("http://localhost:8080/login",{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({email:frm.email, psw:frm.psw}),
      credentials:'include'
    });
    const re=await result.json();
   if(re.msg==="Valid user"){
       jump('/home');
   }else{
    alert(re.msg);
   }
  }
  return (
    <>
    
     <div  className="container-fluid lobg">
         <div className='row'>
          <div className='col-sm-4'>&nbsp;</div>
          <div className='col-sm-4'>

          <div  class="shadow-lg  mt-5 p-5">
            <div className='text-center'>
            <h1>Login</h1>
            </div>
              <div class="form-group">
                <label>Email</label>
                <input className='form-control' onChange={fun} id='email' placeholder='Enter email'/>
              </div>

              <div class="form-group">
                <label className='fs-5 pt-3'>Password</label>
                <input className='form-control' onChange={fun} id='psw' placeholder='Enter password'/>
              </div>
              <br/>
              <div class="text-center">
               <button className='btn btn-success' onClick={saverecord}>Login</button>
               </div>
               <div class='text-end'>
                <label onClick={signup} class='sig border border-dark '>Create new account</label>
               </div>
          </div>
          </div>
          <div className='col-sm-4'>&nbsp;</div>
         </div>  
    </div> 
    </>
  );
}

export default App;


