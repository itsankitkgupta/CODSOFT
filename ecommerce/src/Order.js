import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Order=()=>{
    const [record, setrecord]=useState([]);
    const [data, setdata]=useState([]);
    const [cookie, setcookie, removecookie]=useCookies();
    const [tottal, settotal]=useState([]);

    useEffect(()=>{
        getdata();
    },[]);

  
    const getdata=async()=>{
        const de=await fetch("http://localhost:8080/order/"+cookie["mycookie"],{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        })
        const re=await de.json();
        
        var r="",a="",dt="";
        
        for(var i=0;i<2;i++){
            r=re[i].orderno;
            a=await fetch("http://localhost:8080/orderdt/"+r,{
                method:"GET",
                headers:{'Content-type':'application/json'}
            })
            dt=await a.json();
            setdata(dt);
            console.log(r)
        }
        setrecord(re);
    }

    const showord=async()=>{
        var r="",a="",d="";
        
        for(var i=0;i<record.length;i++){
            r=record[i].orderno;
            a=await fetch("http://localhost:8080/orderdt/"+r,{
                method:"GET",
                headers:{'Content-type':'application/json'}
            })
            d=await a.json();
          settotal(d);
          
        }
    }

   const ordrepeat=async()=>{
       if(cookie["mycookie"]){
          const data1=await fetch("http://localhost:8080/address/one/"+cookie["mycookie"],{
            method:"GET",
            headers:{'Content-Type':'application/json'}
          })
          const re=await data1.json();
          const addresss=(re.name+"_;"+re.mobile+"_:"+re.address+""+re.city+","+re.state+","+re.pincode);
          const date1=new Date();
         const ndate="Time:"+date1.getHours()+":"+date1.getMinutes()+":"+date1.getSeconds()+" Date: "+ date1.getDate() +"/" + date1.getMonth()+ "/" + date1.getDay();
         
         const na=await fetch("http://localhost:8080/order",{
         method:"POST",
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({date:ndate,amount:"amount",status:"pending", email:cookie["mycookie"],address:addresss})
 })
         const g=await na.json();
          
        }    
    }
    return(<>
    <div >
       {record.map((e)=>{
        return(

            <div  className="row m-4 shadow-lg bg-light p-2 rounded">
            <div className="row">
                <div className="col-sm-3">
                <label>order no.{e.orderno}</label>
                </div>
                <div className="col-sm-5">
                <label>{e.date}</label>
                </div>
                <div className="col-sm-2">
                <label className="h5">Total amount:{e.amount}</label>
                </div>
                <div className="col-sm-2">
                <label className="fs-5">status: {e.status}</label>
                </div>
            </div>
           

           {data.map((x)=>{
            return(
                <div className="col-sm-3 ">
                <div className="row ">
                <div className="col-sm-5" >
                <img  style={{height:120, width:120}} src={x.pic}/>
                </div>
                  <div className="col-sm-6">
                  <label className="">Name:{x.pname}</label><br/>
                  <label>price:{x.price}</label><br/>
                  <label>quantity:{x.quantity}</label>
                  </div>
                  </div>
                  </div>
            )
           })}
         
            
            <div className="col-sm-6 text-center">
            <button onClick={showord} className="btn btn-success mt-5" data-bs-toggle="modal" data-bs-target="#myModal">order detail</button>
            </div>
            <label className="">Address:{e.address}</label>
        </div>

        )
       })}
   
    </div>

    <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Order Detail</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body mo" >
      {tottal.map((x)=>{
            return(
               
                <div className="row shadow-sm m-2 bg-light rounded">
                <div className="col-sm-5" >
                <img  style={{height:120, width:120}} src={x.pic}/>
                </div>
                  <div className="col-sm-6">
                  <label className="fs-5">Name:{x.pname}</label><br/>
                  <label>price:{x.price}</label><br/>
                  <label>quantity:{x.quantity}</label>
                  </div>
                  </div>  
            )
           })}
      <div className="text-center">
        <button onClick={ordrepeat} className="btn btn-success">Repeat order</button>
      </div>
      </div>
      <div class="modal-footer">
            </div>

    </div>
  </div>
</div>
    </>)
}
export default Order;