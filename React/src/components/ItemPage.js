import React,{useEffect, useState} from 'react'
import NavBar from './NavBar'
import '../cssFile/ItemPage.css'
import { withRouter } from 'react-router-dom';

 function ItemPage(props) {
    const [addedWish,setAddedWish] = useState(false);
    const [addedCart,setAddedCart] = useState(false);
    const [item,setItem] = useState({})
    const [cartList, setCartList] = useState([]);
    const [wishList,setWishList]=useState([]);
useEffect(()=>{
    fetch('/get-CartList').then(r=>r.json()).then(data=>setCartList(data.cartList))

 fetch('/getItem').then(r=>r.json()).then(data=>{
    // console.log(data)
      setItem(data.item)
    })
    checkIfInCart();
    checkIfInWish();
},[item])
// lower the ram ask any one

function checkIfInCart(){
  cartList.map(e =>{
    if(e.id == item.id){
        setAddedCart(true);
    }
  })
  }


  function checkIfInWish(){
    fetch("/get-wishList").then(r=>r.json()).then(data=>{setWishList(data.wishList)}).then(()=>{
      !!wishList && wishList.map(e =>{
        if(e.id == item.id){
          setAddedWish(true);
        }
      })
    })

  }

  function AddToCart(){
    let itemId = item.id;
    fetch('/add-CartList',{
      method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId})
    }).then(()=>{
      // props.renderPage();
      console.log("renderTime")
    })
    }


       function AddToWishList(){
         let itemId = item.id;
         fetch('/add-wishList',{
           method:"POST",
           headers:{
             "Content-Type":"application/JSON"
           },
           body:JSON.stringify({itemId})
         }).then(r=>r.json()).then(data=>{
console.log(data)
         })
       }

    return (
        <div id="ItemPageDiv">
             <NavBar  Page="ItemPage" />
        <img id="itemPhoto" src={item.imgsrc} />
        <h1 id="itemTittle">{item.title}</h1>
        <h4 id="itemPrice">Price : {item.price}$</h4>
        {addedCart?<button className="btn btn-danger" disabled>Added to cart !</button>:<button className="btn btn-success"  onClick={AddToCart}>Add To Cart</button>}<br/><br/>
        {addedWish?<button className="btn btn-danger" disabled >Added to Wish List!</button>:<button className="btn btn-success"  onClick={AddToWishList}>Add To Wish List</button>}
        <h4 id="itemDescription">{item.descrption}</h4> 
        </div>
    )
}
export default withRouter(ItemPage)