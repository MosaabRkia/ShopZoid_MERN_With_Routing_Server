import React,{useEffect, useState} from "react";
import { useHistory, withRouter } from "react-router-dom";
import EachLine from "./EachLine";
import NavBar from "./NavBar";

 function CartPage(props) {

      const [cartArr,setCartArr] = useState(props.cartArray)
     // let [total,setTotal] = useState(0); 
      let [list,setList] = useState([]); 
      let [total,setTotal] = useState(0); 
      let history = useHistory()

      useEffect(()=>{
        updateCartPage();
      },[])

function updateCartPage(){
setTimeout(()=>{
  fetch('/get-CartList').then(r=>r.json()).then(data=>setList(data.cartList))
  fetch('/gettotalCart').then(r=>r.json()).then(data=>setTotal(data.total))
},1000)
}



    const RemoveOne=(e1)=>{
fetch('/remove-CartList',{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({id:e1})
}).then(()=>{
  updateCartPage()
})
    }


    function ChangeQuantity(id,quantity){
      console.log(id,quantity)
      if(quantity <= 0)
      {
         fetch('/changeQuantity',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id,quantity:1})
      })
      }
      else{
        fetch('/changeQuantity',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id,quantity})
        })
      }
   setTimeout(()=>{
    updateCartPage()
   },1000)
   }

function PayAll(){
  history.push("/PaymentPage", { from: this })
}


  return (
    <div>
      <NavBar Page="CartPage" toLink="/MainPage" />
      <ul key="List" className="list-group">
        {  
            !!list && list.map((e) => {
              return <EachLine type="CartList" quantity={e.quantity} changeQuantity={ChangeQuantity} e={e.item} RemoveOne={RemoveOne} /> ;
            })     
        }
      <h1 style={{color:'white'}}>  Total : {total}$</h1>
      </ul>
      <div onClick={PayAll} style={{textAlign:"center", display:total!==0?"block":"none"}}> <button className="btn btn-primary">Pay All</button></div>
     
    </div>
  );
}
export default withRouter(CartPage) 