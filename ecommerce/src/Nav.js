import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Nav=()=>{
  const [data, setdata]=useState([]);
  const quant=useSelector((state)=>state.cartfun);
  const [input, setinput]=useState("");
  const [cookie, setcookie, removecookie]=useCookies();
  const dispatch=useDispatch();
  useEffect(()=>{
    loaddata();
    getquantity();
    if(cookie["mycookie"]){
     const log= document.getElementById("log");
     log.style.display="none";
       const sig= document.getElementById("sig");
    sig.style.display="none";
    }else{
      const ord= document.getElementById("ord");
       ord.style.display="none";
       const log= document.getElementById("log");
       log.style.display="block";
       const sig= document.getElementById("sig");
      sig.style.display="block";

    }
  },[]);
   const jumpl=useNavigate();
  const jumplogin=()=>{
       jumpl('/login');
  }
const searchp=(e)=>{
setinput(e.target.value);

}

  const gosearch=()=>{
    jumpl("/search/"+input)
  }
  const jumpsignup=()=>{
    jumpl('/signup');
}
  const gocart=()=>{
    jump('/cart');
  }
  const gohome=()=>{
    jump('/home');
  }
  const goorder=()=>{
    jump('/order');
  }

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
    dispatch({type:"GT",citem:total}) 
    
  }

  const loaddata=async()=>{
    const result=await fetch("http://localhost:8080/category",{
      method:"GET",
      headers:{'Content-Type':'application/json'}
    })
    const de= await result.json();
    setdata(de);
  }
const jump=useNavigate();
  const searchproduct=(x)=>{
    jump("/show/"+x);
  }
  const ref=useRef();
  const topli=useRef();
  const middleli=useRef();
  const btmli=useRef();
  var click=true;
  const toggle=()=>{
    if(click){
      click=false;
   ref.current.style.transform='translateX(0px)';
  // middleli.current.style.transform='translateX(-50px)';
  // topli.current.style.transform='rotate(45deg)';
   //btmli.current.style.transform='rotate(-45deg)';
    }else{
      click=true;
      ref.current.style.transform='translateX(-200px)';
     // btmli.current.style.transform='rotate(0deg)';
      //middleli.current.style.transform='translateX(0px)';
      //topli.current.style.transform='rotate(0deg)';
    }
  }

    return(<>
  
    <div className="row bg-primary text-white">
     <div className="col-sm-4">&nbsp;&nbsp;+91 7007961398</div>
      <div className="col-sm-4 text-center">ankitkumar132962@gmail.com</div>
      <div className="col-sm-4 text-end">
      <i className="fa fa-facebook"></i>&nbsp;&nbsp;
      <i className="fa fa-twitter"></i>&nbsp;&nbsp;
      <i className="fa fa-linkedin"></i>&nbsp;&nbsp;
      <i className="fa fa-instagram"></i>&nbsp;&nbsp;
      <i className="fa "></i>&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
     <div className="navcolor">
   
     <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <div class="container-fluid">
  
    <a  class="navbar-brand name" href="javascript:void(0)">Mystore</a>
    <div onClick={toggle}  className="toggle">
    <span ref={topli} className="top_line common"></span>
    <span ref={middleli} className="middle_line common"></span>
    <span ref={btmli} className="bottom_line common"></span>
  </div>

    <form  class="d-flex frm">
       <input class="form-control me-2 search" style={{width:'100%'}} type="text" placeholder="Search"/>
      <button class="btn btn-primary" type="button">Search</button>
      </form>

    <div  class="collapse navbar-collapse" id="mynavbar3">
      <ul class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link text-light" href="javascript:void(0)">home</a>
        </li>
        <li class="nav-item">
        <div className="dropdown">
           <button className="btn cat  dropdown-toggle text-light" data-bs-toggle="dropdown">Category</button>
            <ul className="dropdown-menu">
              {data.map((e)=>{
                return(
                  <li onClick={()=>{searchproduct(e._id)}}><a className="dropdown-item catitm">{e.cate}</a></li>
                )
              })}
            </ul>
            </div>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" href="javascript:void(0)">service</a>
        </li>
        <li class="nav-item">
        <div className="cart"   onClick={gocart}>
          <img src={require('./images/cart.png')} style={{width:"40px", height:"35px"}} />
          <span style={{position:"relative",top:"-10px",left:"-5px"}} class="badge bg-danger">{quant}</span>
             </div>
        </li>
        <li class="nav-item">
        <div id="ord"  className=" ord mt-2 text-light rounded ">
              <label onClick={goorder} className="text-center ">order</label>
            </div>
        </li>
        <li class="nav-item">
        <div id="log" className=" ms-4 mt-1 p-1 text-light" onClick={jumplogin} >Login</div>
       
        </li>
        <li class="nav-item">
        <div id="sig" className="text-light ms-4 mt-1 p-1" onClick={jumpsignup}>Signup</div>
        </li>
      </ul>
    </div>
   </div>
</nav>

<div  className="slider " id="toggle" ref={ref}>
     <h1>MENU</h1>
     <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Category</a></li>
      <li><a href="#">Service</a></li>
      <li><a href="#">About us</a></li>
     </ul>
    </div>
 
{/*
          <div onClick={gosearch} className="col-sm-1 se text-center  border border-dark mb-4 mt-2 rounded ">Search</div>
          <div className="col-sm-6 ">
           <div className="row nav">
            <div className="col-sm-2"></div>
           <div  className="col-sm-1 mt-2 h5 home"onClick={gohome} >Home</div>&nbsp;&nbsp;&nbsp;
          <div className="col-sm-2">
          <div className="dropdown">
           <button className="btn cat fs-5 dropdown-toggle" data-bs-toggle="dropdown">Category</button>
            <ul className="dropdown-menu">
              {data.map((e)=>{
                return(
                  <li onClick={()=>{searchproduct(e._id)}}><a className="dropdown-item catitm">{e.cate}</a></li>
                )
              })}
            </ul>
            </div>
          </div>&nbsp;&nbsp;
          <div  className="col-sm-2 text-center mb-2 mt-2 text-dark h5">Service</div>
          <div className="col-sm-1 cart"   onClick={gocart}>
          <img src={require('./images/cart.png')} style={{width:"40px", height:"35px"}} />
          <span style={{position:"relative",top:"-43px",left:"30px"}} class="badge bg-danger">{quant}</span>
             </div>
            <div id="ord"  className="col-sm-2 fs-5 ord border border-dark rounded  mt-2 mb-4 m-3 text-center">
              <label onClick={goorder} className="text-center ">order</label>
            </div>
          <div id="log" className="col-sm-1 mt-2 mb-4 p-1 border border-dark rounded h6 " onClick={jumplogin} >Login</div>&nbsp;&nbsp;
          <div id="sig" className="col-sm-1 p-1 mt-2 mb-4 border border-dark rounded h6" onClick={jumpsignup}>Signup</div>
          </div>
          </div> */}
          </div>
   
    </>)
}
export default Nav;