import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import OrdersListBar from "./OrdersListBar";

export default function OrdersListAdmin() {
  const [ordersList, setOrdersList] = useState([]);
  let [AdminOrNot,setAdminOrNot] = useState(false)

  useEffect(() => {
    fetch('/AdminOrNot').then(r=>r.json()).then(data=>{
      if(data.rank === "admin")
          setAdminOrNot(true)
          else
          setAdminOrNot(false)
    }).then(()=>{
          renderPage();
    })

  }, []);
  function renderPage(){
    fetch("/getAllOrders")
    .then((r) => r.json())
    .then((data) => {
      setOrdersList(data.orders);
    });
  }
  if(AdminOrNot === true){
    return (
    <div>
    <NavBar Page="Admin"/>
    <ul className="list-group">
        <li className="list-group-item disabled">orders list</li>
      {!!ordersList &&
        ordersList.map((e) => {
           return <OrdersListBar renderPage={renderPage} e={e}/>
        })}
    </ul>
    </div>
  );
  }
  else{
    return(
        <div>
        your not admin !
    </div> 
    )
   
}
}
