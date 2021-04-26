import React, { useEffect, useState } from "react";
import OrdersListBar from "./OrdersListBar";

export default function OrdersListAdmin() {
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    renderPage();
  }, []);
  function renderPage(){
    fetch("/getAllOrders")
    .then((r) => r.json())
    .then((data) => {
      setOrdersList(data.orders);
    });
  }
  return (
    <ul className="list-group">
        <li className="list-group-item disabled">orders list</li>
      {!!ordersList &&
        ordersList.map((e) => {
           return <OrdersListBar renderPage={renderPage} e={e}/>
        })}
    </ul>
  );
}
