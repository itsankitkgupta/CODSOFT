import { Link } from "react-router-dom";

const Nav=()=>{
    return(
        <>
         <div className="container-fluid bg-primary h2 row">
        <label className="col-sm-10">Dashboard</label>
        <div className="col-sm-1 ">
        <div class="dropdown">
        <button type="button" class="btn btn-primary fs-4 dropdown-toggle" data-bs-toggle="dropdown">
    Account
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">change password</a></li>
    <li><a class="dropdown-item" href="#">profile</a></li>
    <li><a class="dropdown-item" href="#">Logout</a></li>
  </ul>
</div>
</div>
</div>
        </>
    )
}

const Sidemenu=()=>{
    return(
        <>
        <div className="border text-center fs-4">
         <button className="btn btn-primary fs-4 m-2">
            <Link to={'/category'} className="text-white " >Category</Link>
            </button><br/>
       <button className="btn btn-primary fs-4 m-2">Order</button>
       <button className="btn btn-primary fs-4 m-2">Return order</button>
       <button className="btn btn-primary fs-4 m-2">
        <Link to={'/product'} className="text-white" >Product</Link>
       </button>
       </div>
        </>
    )
}
export default Nav;
export {Sidemenu}

