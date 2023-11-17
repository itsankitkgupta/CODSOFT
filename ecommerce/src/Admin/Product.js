import { useEffect, useState } from "react";
import Nav, { Sidemenu } from "./admincomp";

const Product=()=>{
    const [pro, setpro]=useState([]);
    const [pdata, setpdata]=useState([]);
    const [data , setdata] = useState([]);
    const [frm,setfrm]=useState({txtpic1:"", txtcatid1:"",txtpname1:"",txtprice1:"",txtofferprice1:"",txtdescription1:"",txtcatid:"",txtpname:"",txtprice:"",txtofferprice:"",txtdescription:""});
    const [fle,setfle]=useState("");

    const fun1=(e)=>{
        setfrm({...frm,[e.target.id]:e.target.value})
    }
    const fun2=(e)=>{
        setfle(e.target.files[0]);
    }

    const saverecord=async()=>{
        const fdata=new FormData();
        fdata.append("pro_pic",fle);
        fdata.append("pname",frm.txtpname);
        fdata.append("price",frm.txtprice);
        fdata.append("offerprice",frm.txtofferprice);
        fdata.append("description",frm.txtdescription);
        fdata.append("catid",frm.txtcatid);
        const rec=await fetch("http://localhost:8080/product",{
            method:"POST",
            body:fdata
        })
        const data=await rec.json();
        alert(data.msg);
        loadproduct();
    }

    useEffect(()=>{
       loadproduct();
    },[]);

    const loadproduct=async()=>{
        const da= await fetch("http://localhost:8080/product",{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        })
        const re=await da.json();
        setpdata(re);
       

    }

    const loaddata= async()=>{
      const result =await fetch("http://localhost:8080/category",{
        method:"GET",
        headers:{'Content-Type':'application/json'}
      })
      const da= await result.json();
      setdata(da);
    }

     const deletedata=async(x)=>{
        const result=await fetch("http://localhost:8080/product",{
            method:"DELETE",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({sid:x})
        })
        const de=await result.json();
        alert(de.msg);
        loadproduct();
     }

     const editcat=async(x)=>{
        const re= await fetch("http://localhost:8080/product/"+x,{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        })
        const de= await re.json();
     setfrm({...frm, txtcatid1:de.catid, txtpname1:de.pname, txtprice1:de.price, txtofferprice1:de.offerprice, txtdescription1:de.description })

     }
    
     const updatedata=async()=>{
        const formdata= new FormData();
        formdata.append("catid",frm.txtcatid1);
        formdata.append("pname",frm.txtpname1);
        formdata.append("offerprice",frm.txtofferprice1);
        formdata.append("price",frm.txtprice1);
        formdata.append("description",frm.txtdescription1);
        formdata.append("file",fle)
        const result =await fetch("http://localhost:8080/product",{
            method:"PUT",
            body:formdata,
            });
     }
    return(
        <>
         <Nav/>
    <div className="row">
     <div className="col-sm-2 "> 
     <Sidemenu/> 
     </div>
     <div className="col-sm-9">
            <div className="container text-end p-3">
            <button className="btn btn-primary " onClick={loaddata} data-bs-toggle="modal" data-bs-target="#myModal">Add new product</button>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Tittle</th>
                        <th>Price</th>
                        <th>Offer price</th>
                        <th>Pic</th>
                        <th>Discription</th>
                    </tr>
                </thead>
                <tbody>
                    {pdata.map((e)=>{
                        return(
                        <tr>
                        <td>{e.catid}</td>
                        <td>{e.pname}</td>
                        <td>{e.price}</td>
                        <td>{e.offerprice}</td>
                        <td><img style={{width:"100px"}} src={"http://localhost:8080/"+e.pic} /></td>
                        <td>{e.description}</td>
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal1" onClick={()=>{editcat(e._id)}}>Edit</button>&nbsp;
                        <button className="btn btn-danger" onClick={()=>{deletedata(e._id)}}>Delete</button>
                    </tr>
                        )
                    })}
                  
                </tbody>
            </table>
            </div>

   <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add new Product</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-start">
         <label className="fs-4">Category</label>
         <select className="form-select" onChange={fun1} id="txtcatid">
            <option selected>select category</option>
            {data.map((e)=>{
                return(
                    <option value={e._id}>{e.cate}</option>
                )
            })}
          
         </select>
         <label className="fs-4">Enter Product Name</label>
         <input className="form-control" onChange={fun1} id="txtpname" />
         <label className="fs-4">Enter Price </label>
         <input className="form-control" onChange={fun1} id="txtprice" />
         <label className="fs-4">Enter Offer price</label>
         <input className="form-control" onChange={fun1} id="txtofferprice" />
         <label className="fs-4">Enter Discription</label>
         <input className="form-control" onChange={fun1} id="txtdescription" />
         <label className="fs-4">Product image</label>
         <input className="form-control" onChange={fun2} type="file" id="txtpic" />

      </div>
      <div class="modal-footer">
        <button type="button" onClick={saverecord} class="btn btn-success">Save</button>
      </div>
     </div>
     </div>
     </div>
    </div>

    <div class="modal" id="myModal1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add new Product</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-start">
         <label className="fs-4">Category</label>
         <select className="form-select"  onChange={fun1} id="txtcatid1">
            <option value={frm.txtcatid1} selected></option>
          
         </select>
         <label className="fs-4">Enter Product Name</label>
         <input className="form-control" value={frm.txtpname1} onChange={fun1} id="txtpname1" />
         <label className="fs-4">Enter Price </label>
         <input className="form-control" value={frm.txtprice1} onChange={fun1} id="txtprice1" />
         <label className="fs-4">Enter Offer price</label>
         <input className="form-control" onChange={fun1}value={frm.txtofferprice1}  id="txtofferprice1" />
         <label className="fs-4">Enter Discription</label>
         <input className="form-control" onChange={fun1} value={frm.txtdescription1} id="txtdescription1" />
         <label className="fs-4">Product image</label>
         <input className="form-control" onChange={fun2}  type="file" id="txtpic1" />

      </div>
      <div class="modal-footer">
        <button type="button"  class="btn btn-success">Save</button>
      </div>
     </div>
     </div>
     </div>
           
        </>
    )
}
export default Product;