import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

function ShowListMyOrders(props) {
let[totalOrder,setTotalOrder] = useState(0)
useEffect(()=>{
//   props.e.map(item=>{
//     console.log(item)
//     setTotalOrder(totalOrder + item.quantity*item.item.price)
// })
},[])
function confirmOrder(){
  let id = props.orderId
  fetch('/confirmOrder',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({id})
  }).then((r=>r.json())).then(data=>{
    props.reloadPage()
  })

}

    return (
        <ul>
        <h4 style={{color:"white"}}>Order Id : {props.orderId}</h4>
        <h4 style={{color:"white"}}>status : {props.status}</h4>
        <h4 style={{color:"white"}}>date Place Order : {props.datePlaceOrder}</h4>
        
            {props.e.map(r =>{
    return (<li key={r.item.orderId} style={{display:"flex",margin:"5px"}} className="list-group-item">
      <div id="photoDiv">
        <img id="imgOrder" src={r.item.imgsrc} />
      </div>
      <div id="typeDiv">
      <p id="orderIdText"> {r.item.title}</p>
        <p id="orderIdText"> Id Item : {r.item.id}</p>
        <p>quantity : {r.quantity}</p>
        <p id="orderPriceText">Price : {r.item.price*r.quantity}$</p>
      </div>
    </li>
  );
            })}
            <p>{totalOrder}</p>
          {props.confirmed? <button disabled>order confirmed !</button>:<button onClick={confirmOrder}>confirm order</button>}
        </ul>
    )
}
export default withRouter(ShowListMyOrders)