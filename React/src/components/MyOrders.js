import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from './NavBar'
import ShowListMyOrders from './ShowListMyOrders'

 function MyOrders() {
const [ArrOrdersIds,setArrOrdersIds] = useState([]);
const [ArrOrders,setArrOrders] = useState([]);
const [total,setTotal] = useState(0);
useEffect(()=>{
    reloadPage()
},[])
function reloadPage(){
    fetch('/getPlacedOrders').then(r=>r.json()).then(data=>{
        setArrOrders(data.List)
     })
}
    return (
        <div>
            <NavBar toLink="/ProfilePage" Page="MyProfilePage"/>
            <div className="list-group">
            {
               ArrOrders.map((e/*,index*/ )=>{
                     return <ShowListMyOrders reloadPage={reloadPage} confirmed={e[0].closed} datePlaceOrder={e[0].datePlaceOrder} status={e[0].status} orderId={e[0]._id}/* index={index}*/  e={e[0].listItems}/>   
                })
            }
            </div>
        </div>
    )
}
export default withRouter(MyOrders)
