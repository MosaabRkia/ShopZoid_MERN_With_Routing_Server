import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "../cssFile/EachLine.css";
 function EachLine(props) {
  const [cartList, setCartList] = useState([]);
  const [addedCart,setAddedCart] = useState(false);
  const [quantity,setQuantity] = useState(0);
  useEffect(() => {
    fetch('/get-CartList').then(r=>r.json()).then(data=>setCartList(data.cartList))
    renderPageAddToCart()
  },[cartList])

  function AddToCartWishList(){
    let itemId = props.e.id;
    fetch('/add-CartList',{
      method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId})
    }).then(()=>{
      console.log("worked all")
    })
}

function RemoveOne(){
  props.RemoveOne(props.e.id)
}

function renderPageAddToCart(){
  cartList.map(e =>{
    if(e.id == props.e.id){
        setAddedCart(true);
    }
  })
}
async function changeQuantity(e){
  props.changeQuantity(props.e.id,Number(e.target.value))
}


function RemoveFromWishList(){
  fetch('/remove-wishList',{method:"POST",headers:{"Content-Type":"application/JSON"},body:JSON.stringify({id:props.e.id})}).then(r=>r.json()).then(data=>console.log(data))
}


  if(props.type == "PaymentPage"){
    return (<li style={{display:"flex",margin:"5px"}} className="list-group-item">
    <div id="photoDiv">
      <img id="imgOrderCart" src={props.e.item.imgsrc} />
    </div>
    <div id="typeDiv">
      <p id="titleOfCart">{props.e.item.title}</p>
      <p id="priceCart">US {props.e.item.price}$</p>
      <p style={{position:"relative",top:"25px",left:"60px",fontSize:"17px"}}>- {props.e.quantity} pcs</p>
    </div>
  </li>
);
  }


    if(props.type == "WishList"){
      return (<li key={props.e.id} style={{display:"flex",margin:"5px"}} className="list-group-item">
      <div id="photoDiv">
        <img id="imgOrder" src={props.e.imgsrc} />
      </div>
      <div id="typeDiv">
        <p id="orderIdText">Id : {props.e.id}</p>
        <p>quantity : {props.e.quantity}</p>
        <p id="orderPriceText">Total Price : {props.e.price}$</p>
        {addedCart?<button disabled>added To Cart!</button>:<button onClick={AddToCartWishList}>Add To Cart</button>}
        <button onClick={RemoveFromWishList}>Remove</button>
      </div>
    </li>
  );
    }
    if(props.type == "CartList"){
      return (<li key={props.e.orderId} style={{display:"flex",margin:"5px"}} className="list-group-item">
      <div id="photoDiv">
        <img id="imgOrderCart" src={props.e.imgsrc} />
      </div>
      <div id="typeDiv">
        <p id="titleOfCart">{props.e.title}</p>
        <p id="priceCart">US {props.e.price}$</p>
        <input onChange={changeQuantity} placeholder="1"  id="quantityCart" type="number"/>
        <button onClick={RemoveOne} id="deleteButton">🗑</button>
      </div>
    </li>
  );
    }
    
}
export default withRouter(EachLine)