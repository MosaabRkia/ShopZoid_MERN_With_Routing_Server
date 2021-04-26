import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';

export default function OrdersListBar(props) {
    const [userName, setUserName] = useState("unknown");
    const [statusChange, setStatusChange] = useState("unknown");
    const [showItemsList, setShowItemsList] = useState(false);

    useEffect(()=>{
        const id = props.e.userId
        fetch('/userName',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        }).then(r=>r.json()).then(data=>setUserName(data.fullName))
    },[])
    function changeStatus(){
        if(statusChange !== null && statusChange !== "unknown" && statusChange !== "change status"){
            const id = props.e._id;
fetch('/changeStatus',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id,statusChange})
}).then(r=>r.json()).then((data)=>{
    if(data.changed === true){
        alert("sucessfully changed status of " + id)
        props.renderPage()
    }
    else{
        alert("not changed status of " + id + " error!")
    }
})
        }
    }
    return (
        <li className="list-group-item">
          <p>{props.e._id}</p>
          <p>user Name : {userName}</p>
          <p>items quantity: {props.e.listItems.length}</p>
          <h4>{props.e.closed?"Closed":"not Closed"}</h4>
          <h4>status : {props.e.status}</h4>
          <select onChange={(e)=>{setStatusChange(e.target.value)}}>
          <option disabled selected value={null}>change status</option>
         <option value="out of stock">out of stock</option>
         <option value="Order Canceled">Order Canceled</option>
         <option value="Order Placed">Order Placed</option>
         <option value="Shipped">Shipped</option>
         <option value="Arrived Sucessfully">Arrived Sucessfully</option>
          </select>
          <button onClick={changeStatus}>change</button>
          <br/>
          {showItemsList?<button onClick={()=>{setShowItemsList(!showItemsList)}}>hide items list</button>:<button onClick={()=>{setShowItemsList(!showItemsList)}}>show items list</button>}
          {showItemsList?props.e.listItems!== undefined && props.e.listItems !== null && props.e.listItems.map(item=>{return <li className="list-group-item">id:{item.id} {item.title} : Quantity:{item.quantity}</li>}):""}
        </li>
      )
}
