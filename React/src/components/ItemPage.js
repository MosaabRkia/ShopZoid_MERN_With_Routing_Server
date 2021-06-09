import React,{useEffect, useState, useCallback  } from 'react'
import NavBar from './NavBar'
import '../cssFile/ItemPage.css'
import { withRouter } from 'react-router-dom';
import WishListButton from './WishListButton';

 function ItemPage(props) {
    const [addedWish,setAddedWish] = useState(false);
    const [addedCart,setAddedCart] = useState(false);
    const [item,setItem] = useState({})
    const [cartList, setCartList] = useState([]);
    const [wishList,setWishList]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [dataToLoad,setDataToLoad] = useState(
      {
      imgsrc:"https://www.myanimalarm.com/Content/images/ajax-loader.gif",
      otherSrc:"https://www.paypesa.in/client-assets/img/spinner-loading.gif"
  }
    )

useEffect(()=>{
    getCartList();
    checkIfInWish();
},[item])


useEffect(()=>{
  getItem();
    getCartList();
    checkIfInWish();
},[])

// lower the ram ask any one
function getItem(){
  setIsLoading(false)
  fetch('/getItem').then(r=>r.json()).then(data=>{setItem(data.item)})
  .then(()=>{setTimeout(()=>{
      setIsLoading(true)
    },2500)})
}
function getCartList(){
  fetch('/get-CartList').then(r=>r.json()).then(data=>{
    data.cartList.map(e =>{
      if(e.id == item.id){
          setAddedCart(true);
      }
    })
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
      getCartList();
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
          checkIfInWish();
         })
       }
return(
  isLoading? (
    <div id="ItemPageDiv">
         <NavBar  Page="ItemPage" />
         <div id="photoDivView"><img id="itemPhoto" src={item.imgsrc} /></div>
    <h1 id="itemTittle">{item.title}</h1>
    <div id="linePriceAndWish" style ={{display:"flex",justifyContent: "space-between"}}>
    <h4 id="itemPrice">Price : {item.price}$</h4> 
    <div  onClick={AddToWishList}>{<WishListButton added={addedWish}/>}</div>
    </div>
    {addedCart?<button id="buttonAddedToCart" disabled>Added to cart !</button>:<button id="buttonAddToCart"  onClick={AddToCart}>Add To Cart</button>}
   <h3 id="descBorder">Description :</h3>
    <h4 id="itemDescription">{item.descrption}</h4> 
    </div>
):
 (
  <div id="ItemPageDiv">
       <NavBar  Page="ItemPage" />
       <div id="photoDivView"><img id="itemPhoto" src={dataToLoad.otherSrc} /></div>
  <div id="LoadingItems">
      <img src={dataToLoad.imgsrc} />
  </div>
  </div>
)
         )
}
export default withRouter(ItemPage)
