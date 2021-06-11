import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from './NavBar'
import ShowListMyOrders from './ShowListMyOrders'

 function MyOrders() {
const [ArrOrders,setArrOrders] = useState([]);
useEffect(()=>{
    reloadPage()
},[])
function reloadPage(){
    fetch('/getPlacedOrders').then(r=>r.json()).then(data=>{
        setArrOrders(data.List)
     })
}
    return (
        <div style={{minWidth:"375px",maxWidth:"600px",margin:"auto"}}>
    
            <NavBar toLink="/ProfilePage" Page="MyProfilePage"/>
            <h1 style={{color:'white', textAlign:"center",margin:"20px auto"}}>Orders List</h1>
            <div className="list-group">
            {
               ArrOrders.map((e,index )=>{
                     return <ShowListMyOrders reloadPage={reloadPage} confirmed={e[0].closed} datePlaceOrder={e[0].datePlaceOrder} status={e[0].status} orderId={e[0]._id} index={index}  e={e[0].listItems}/>   
                })
            }
            </div>
        </div>
    )
}
export default withRouter(MyOrders)
