import React from "react";
import '../cssFile/EachListItem.css'
import { Link, withRouter } from 'react-router-dom'

 function EachListItem(props) {

function ViewItem(ItemId){
  fetch('/LoadPageItem',{
    method: 'POST',
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify({ItemId})
  }).then(r=>r.json()).then((data)=>{
    console.log(data)
    if(data.found == true){
      props.history.push('/ItemPage')
    }
else{
  alert("Unknown Item")
}
  })
}

function AddToCart(){
let itemId = props.Item.id;
fetch('/add-CartList',{
  method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId})
}).then(()=>{
  props.renderPage();
})
}
  return (
    <li id="profileItem">
         <Link to={"/ItemPage"} onClick={()=>ViewItem(props.Item.id)}>
      <img id="profileImg" src={props.Item.imgsrc} />
      <h4 id="profileTittle">{props.Item.title}</h4>
      <small id="profilePrice">{props.Item.price}$</small><br/>
      </Link>
      <button disabled={props.Added} onClick={AddToCart} style={{marginBottom:"5px",backgroundColor:props.Added?"gray":"blue"}} className="btn btn-primary">{props.Added?"Already In Cart":"Add to Cart"}</button>
    </li>

  );
}
export default withRouter(EachListItem)