import React, { useEffect, useState } from 'react'
import {withRouter } from 'react-router-dom'
import EachLine from './EachLine'
import FormPayment from './FormPayment'
import NavBar from './NavBar'

function PaymentPage(props) { 
     let [list,setList] = useState(0); 
     let [total,setTotal] = useState(0); 

     useEffect(()=>{
         fetch('/user/cartList').then(r=>r.json()).then(data=>setList(data.cartList));
         fetch('/user/gettotalCart').then(r=>r.json()).then(data=>setTotal(data.total))
     },[])
    return (
        <div style={{minWidth:"375px",maxWidth:"600px",margin:"auto"}}>
              <NavBar Page="CartPage" toLink="/CartPage" /> 
              {
                  !!list&&list.map(e=>{
                    return  <EachLine type="PaymentPage" e={e}/>
                  })
              }
              <h1 style={{color:"white"}}>total Order : {total}$</h1>
              <FormPayment />
        </div>
    )
}
export default withRouter(PaymentPage)