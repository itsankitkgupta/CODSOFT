import { useEffect, useState } from "react";
import Nav, { Sidemenu } from "./admincomp";

const Catagory=()=>{
    const [frm,setfrm]=useState({txtcatname:"",txtcatname1:""})
    const [load, setload]= useState([]);
    const [id, setid]=useState("");

 
    useEffect(()=>{
     loaddata();
    },[])
    const loaddata=async()=>{
     const data =await fetch("http://localhost:8080/category",{
       method:"GET",
       headers:{'Content-Type':'application/json'}
     });
     const d= await data.json();
     setload(d);
    }
 
   function fun(e){
     setfrm({...frm,[e.target.id]:e.target.value});
   }
 
   const editedata=async(x)=>{
     const result =await fetch("http://localhost:8080/category/"+x,{
       method:"GET",
       headers:{'Content-Type':'application/json'},
      
     })
      const data = await result.json();
      setfrm({...frm,txtcatname1:data.cate});
      setid(x);
   }

   const deletedata=async(x)=>{
    const result= await fetch("http://localhost:8080/category", {
      method:"DELETE",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({sid:x})
    })
    const sdata= await result.json();
    alert(sdata.msg);
    loaddata();
   }

 
   const save=async()=>{
     const result =await fetch("http://localhost:8080/category",{
       method:"POST",
       headers:{'content-Type':'application/json'},
       body:JSON.stringify({cate:frm.txtcatname})
     })
     const m=await result.json();
    alert(m.msg);
    loaddata();
   }

   const updatedata=async()=>{
    const result =await fetch("http://localhost:8080/category",{
      method:"PUT",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({cate:frm.txtcatname1,sid:id})
    })
    const de =await result.json();
    alert(de.msg);
   }
    return(
        <>
         <Nav/>
    <div className="row">
     <div className="col-sm-2 "> 
     <Sidemenu/> 
     </div>
     <div className="col-sm-9">
     <div className=" text-end">
     <button className="btn btn-primary fs-5 m-2" data-bs-toggle="modal" data-bs-target="#myModal">Add new Category</button>
     <table className="table table-bordered text-start">
      <thead>
        <tr>
         <th>Category</th>
         <th>Edit</th>
         <th>Delete</th>
         </tr>
      </thead>
      <tbody>{load.map((e)=>{
        return(
          <tr >
          <td>{e.cate}</td>
          <td>
            <button className="btn btn-primary" onClick={()=>{editedata(e._id)}}  data-bs-toggle="modal" data-bs-target="#myModal1" >edit</button>
          </td>
          <td>
            <button className="btn btn-danger" onClick={()=>{deletedata(e._id)}} >delete</button>
          </td>
         </tr>
        )
      })}
      
      </tbody>
     </table>
     </div>
     </div>
     </div>
       
     <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add new category</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-start">
         <label className="fs-4">Enter new category name</label>
         <input className="form-control" id="txtcatname" onChange={fun} />   
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={save}>Save</button>
      </div>

    </div>
  </div>
     </div>
     <div class="modal" id="myModal1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add new category</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-start">
         <label className="fs-4">Enter new category name</label>
         <input className="form-control" id="txtcatname1" value={frm.txtcatname1} onChange={fun} />   
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={updatedata}>Save</button>
      </div>

    </div>
  </div>
  </div>
        </>
    )
}
export default Catagory;