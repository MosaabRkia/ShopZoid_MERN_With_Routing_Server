import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import EachLine from './EachLine'
import FormPayment from './FormPayment'
import NavBar from './NavBar'

function PaymentPage(props) {
    // console.log(props.LastOrder)
    // let [total,setTotal]= useState(0)
    // const [cartArr,setCartArr] = useState(props.cartArray)
    // let [total,setTotal] = useState(0); 
     let [list,setList] = useState(0); 
     let [total,setTotal] = useState(0); 

     useEffect(()=>{
         fetch('/get-CartList').then(r=>r.json()).then(data=>setList(data.cartList));
         fetch('/gettotalCart').then(r=>r.json()).then(data=>setTotal(data.total))
     },[])
    return (
        <div>
              <NavBar Page="PaymentPage" /> 
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