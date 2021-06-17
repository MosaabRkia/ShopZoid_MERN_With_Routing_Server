import React, {useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import '../cssFile/AllItemsPageAdmin.css'
import NavBar from "./NavBar";


function AllItemsPageAdmin(props) {

  let [newPrice,setNewPrice] = useState(0.99);
  let [ID,setID] = useState();
  let [type,setType] = useState();
  let [imgsrc,setImgSrc] = useState();
  let [title,setTitle] = useState();
  let [price,setPrice] = useState(0);
  let [description,setDescription] = useState("");
  let [messege,setMessege] = useState("");
let [allItemsShop,setAllItemsShop] = useState([])
let [selectSearch,setSelectSearch] = useState("all")
let [search,setSearch] = useState()
// let [searchOrNot,setSearchOrNot] = useState(false)
let [AdminOrNot,setAdminOrNot] = useState(false)

useEffect(()=>{
  fetch('/admin/AdminOrNot').then(r=>r.json()).then(data=>{
    if(data.rank == "admin")
        setAdminOrNot(true)
        else
        setAdminOrNot(false)
        console.log(AdminOrNot)
  })
  RenderList()
},[])

// useState(()=>{
//   searchOrNot?searchList():RenderList()
// },[allItemsShop])


function ChangePrice(id){
  console.log(newPrice)
fetch('/admin/changePriceItem',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({price:newPrice,id})
}).then(r=>r.json()).then(data=>{
  if(data.updated === true){
    alert("Updated Price")
    RenderList()
  }
  else{
    alert("something wrong in Updating Price")
  }
})
}
function RenderList(){
  fetch('/admin/getAllItemsShop').then(r=>r.json()).then(data=>{
    console.log(data)
    setAllItemsShop(data)})
}
function searchList(){
  // setSearchOrNot(true)
  if(selectSearch === undefined){
    setSelectSearch("all")
  }
  fetch('/admin/SearchAdminPage',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({search,selectSearch})
  }).then(r=>r.json()).then(data=>{setAllItemsShop(data)
  console.log(data)})
}

function HandleChangePriceItem(e){
  setNewPrice(e.target.value)
}
function HandleChangeID(e){
setID(e.target.value)
}
function HandleChangetype(e){
  setType(e.target.value)
  console.log(e.target.value)
}
function HandleChangeimgsrc(e){
  setImgSrc(e.target.value)
}
function HandleChangetitle(e){
  setTitle(e.target.value)
}
function HandleChangePrice(e){
  setPrice(e.target.value)
}
function HandleChangeDescription(e){
  setDescription(e.target.value)
}
function removeItem(itemId){
  fetch('/admin/removeItem',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({id:itemId})
  }).then(r=>r.json()).then(data=>{
    console.log(data)
    if(data.removed === true){
         alert("removed item")
         RenderList()
    }
    else{
      alert("something wrong (unsucessfully remove item)")
    }
  })
}
function changeSearchType(e){
   setSelectSearch(e.target.value)
}
function changeSearchWord(e){
  setSearch(e.target.value)
}
function searchIt(){
  console.log(search,selectSearch)
  searchList()
}
function addItem(){
  if(this.state.ID !== null 
    && this.state.type !== null
    && this.state.imgsrc !== null
    && this.state.title !== null
    && this.state.price !== null
    && this.state.description !== null
    &&this.state.ID !== "" 
    && this.state.type !== ""
    && this.state.imgsrc !== ""
    && this.state.title !== ""
    && this.state.price !== 0
    && this.state.description !== "")
    {
  fetch('/admin/addItem',{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:ID,type,imgsrc,title,price,description})
  }).then(r=>r.json()).then(data=>{
    if(data.addedItem === true){
      setMessege("successfully added Item " + ID)
    }
    else if(data.addedItem === false){
      setMessege("item already added or id is used ! " + ID)
    }
    else if(data.addedItem === null){
      setMessege("account not Admin !!!")
    }
  })
}
else{
  setMessege("SomeThing Empty Make Sure to fill all !")
  }
}
   if(AdminOrNot === true){
    return (
      <div style={{maxWidth:"600px",minWidth:"375px",margin:"auto"}}>
        <NavBar Page="Admin"/>
          <div style={{textAlign:"center",margin:"auto"}} id="AddItems">
             <h1 style={{color:"black"}}>Add Items</h1>
             {messege}
             <input style={{textAlign:"center",margin:"auto"}} className="form-control"  type="number" name="ID" onChange={HandleChangeID} placeholder="ID"/>
             <select style={{textAlign:"center",margin:"10px auto"}} className="form-control" onChange={HandleChangetype} name="search" id="search">
             <option value={null} selected disabled>select type</option>
          <option value="Case">Case</option>
          <option value="Headphones">Headphones</option>
          <option value="Mouse">Mouse</option>
          <option value="Laptop">Laptop</option>
          <option value="Keyboard">Keyboard</option>
          <option value="CardGraphic">CardGraphic</option>
</select>
             <input style={{textAlign:"center",margin:"10px auto"}} className="form-control" type="text" name="imgsrc" onChange={HandleChangeimgsrc} placeholder="imgsrc"/>
             <input style={{textAlign:"center",margin:"10px auto"}} className="form-control" type="text" name="title" onChange={HandleChangetitle} placeholder="title"/>
             <input style={{textAlign:"center",margin:"10px auto"}} className="form-control" type="number" name="price" onChange={HandleChangePrice} placeholder="price"/>
             <input style={{textAlign:"center",margin:"10px auto"}} className="form-control" type="text" name="description" onChange={HandleChangeDescription} placeholder="description"/>
             <input style={{backgroundColor:"black",color:"white",textAlign:"center",margin:"10px auto"}} className="form-control" type="button" onClick={addItem} value="Add Item"/>
          </div>
       
          <h1 style={{color:"black",textAlign:"center",fontStyle:"bold"}}>Search</h1>
          <input  className="form-control" placeholder="Search" style={{border:"4px solid black",margin: "0px auto 5px auto"}} onChange={changeSearchWord} type="text"/>
          <select  className="form-control" style={{border:"4px solid black",margin: "0px auto 5px auto",display: "block",textAlign:"center"}} onChange={changeSearchType} name="search" id="search">
          <option value="all" selected>select Type</option>
          <option value="Case">Case</option>
          <option value="Headphones">Headphones</option>
          <option value="Mouse">Mouse</option>
          <option value="Laptop">Laptop</option>
          <option value="Keyboard">Keyboard</option>
          <option value="CardGraphic">CardGraphic</option>
</select>
<div style={{textAlign:"center"}}>
          <button style={{border:"1px solid black",color:"white",margin:"2px"}} onClick={searchIt} className="btn">search</button>
       </div>
        <ul className="list-group">
          
          {!!allItemsShop && allItemsShop.map((item) => {
            return (<li id="Line" className="list-group-item">
                  <img alt="imgSrcNull1" id="imgLine" src={item.imgsrc} /> 
                  <br/> id:{item.id} <br/> {item.title}
                   <br/> Price : {item.price}$
          <br/> 

          <div class="input-group mb-3">
  <input style={{margin:"auto"}} type="text" onChange={HandleChangePriceItem} class="form-control" placeholder="New Price" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div class="input-group-append">
    <button  class="btn btn-outline-secondary" onClick={()=>ChangePrice(item.id)} type="button">Change Price</button>
  </div></div>

            <br/>  <button className="btn btn-danger" onClick={()=>removeItem(item.id)}>remove Item</button>
            </li>
            
            )

          })}
        </ul>
      </div>
    )
   }
   else
   return(
      <div>
      not Admin !
    </div>
   )
   
   
}

export default withRouter(AllItemsPageAdmin) 