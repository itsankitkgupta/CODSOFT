const Bottom = ()=>{
    return(
    <>
    <div  className="container-fluid price d-flex h2 mt-3  ">
    <div className="row">
     <div  className="col-sm-3  ">
      <div className="shadow-lg  m-2 pr1">
        <label className="p-4">Lowest price available</label>
        </div>
     </div>
     <div className="col-sm-4 ">
      <div className=" shadow-lg m-2 pr1">
        <label className="p-4">cash on Delivery available</label>
     </div>
     </div>
     <div className="col-sm-3">
      <div className="  shadow-lg m-2 pr1">
        <label className="p-4"> 7 days return avaailable</label>
        </div>
     </div>
    </div>
    </div>
    </>
    )
}
export default Bottom;