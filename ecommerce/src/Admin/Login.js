import {usestate} from 'react'
const Login =()=>{
 // const [data, setdata]=usestate({emial:"",password:""});
  const fun=(e)=>{
    //setdata({...data,[e.target.id]:e.target.value});
  }
    return(<>
     <div className='row mt-5'>
      <div className='col-sm-4'></div>
      <div className='col-sm-3 shadow-lg mb-2 bg-white p-5 rounded'>
        <div className='w-100 text-center'>
        <label className='h1'>Login</label>
        </div> 
        <label className='fs-5'>Email</label>
        <input className='form-control' onchange={fun} id='email'  placeholder='Enter your email'/>
        <label className='fs-5 mt-2' >Password</label>
        <input className='form-control' onchange={fun} id='password' placeholder='Enter password'/>
        <div className='w-100 text-center' >
         <button className='btn btn-primary mt-3 m-2 text-center'>Login</button>
         
         </div>
        
      </div>
      <div className='col-sm-4'></div>
     </div>
    </>)
}
export default Login;