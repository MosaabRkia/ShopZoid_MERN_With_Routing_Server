import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../cssFile/MyOrders.css'
function ShowListMyOrders(props) {
let[totalOrder,setTotalOrder] = useState(0)

useEffect(()=>{
let x = 0;
const DataProps = props.e;
DataProps.forEach(r =>{
 x += parseFloat(r.quantity)  * parseFloat(r.item.price);
})
setTotalOrder(x.toFixed(2))
},[])

function confirmOrder(){
  let id = props.orderId
  fetch('/user/confirmOrder',{
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
      <div>  <h1 style={{color:'white', textAlign:"center",margin:"20px auto"}}>Order {props.index+1}</h1>
        <ul style={{minWidth:"375px",maxWidth:"600px",margin:"auto",padding:'0'}}>
        <p style={{margin:'5px',color:"white"}} id="orderTitle">Order Id : {props.orderId}</p>
        <p  id="orderTitle" style={{margin:'5px',color:"white"}}>status : {props.status}</p>
        <p  id="orderTitle" style={{margin:'5px',color:"white"}}>date Place Order : {props.datePlaceOrder}</p>
        
            {props.e.map(r =>{
    return (<li id="liInOrderList" key={r.item.orderId} style={{display:"flex",margin:"5px"}} >
        <img alt="imageOfIcon2" id="imgInOrderList" src={r.item.imgsrc} />
      <div id="DivType">
       <p id="orderTitle"> {r.item.title}</p>
        <p id="orderTitle">quantity : {r.quantity}</p>
        <p id="orderTitle">Price : {r.item.price*r.quantity}$</p>
      </div>
      
    </li>
    
  );
  
            }
            )}
                        <p style={{color:'white'}} id="orderTitle">Total Order : US {totalOrder}$</p>
          <div style={{margin:"0 0 80px 0",textAlign:"center"}}>{props.confirmed? <button style={{opacity:"50%"}} disabled id="buttonConfimtion">order confirmed !</button>:<button id="buttonConfimtion" onClick={confirmOrder}>confirm order</button>}</div>
        </ul>
        </div>

    )
}
export default withRouter(ShowListMyOrders)