import React,{useEffect, useState  } from 'react'
import NavBar from './NavBar'
import '../cssFile/ItemPage.css'
import { withRouter ,useParams } from 'react-router-dom';
import WishListButton from './WishListButton';


 function ItemPage(props) {
    const [addedWish,setAddedWish] = useState(false);
    const [addedCart,setAddedCart] = useState(false);
    const [item,setItem] = useState({})
    const [wishList,setWishList]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const { id } = useParams()
    const dataToLoad={
      imgsrc:"https://www.myanimalarm.com/Content/images/ajax-loader.gif",
      otherSrc:"https://www.paypesa.in/client-assets/img/spinner-loading.gif"
  }

useEffect(()=>{
    getCartList();
    checkIfInWish();
},[item])


useEffect(()=>{
  getTheItem();
    getCartList();
    checkIfInWish();
},[])

function getTheItem(){
  setIsLoading(false)
  fetch('/item/getItem',{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({id})
  }).then(r=>r.json()).then(data=>{setItem(data.item)}).then(()=>{
    setTimeout(()=>{
      setIsLoading(true)
    },3000)
  })
}

// lower the ram ask any one
// function getItem(){
//   setIsLoading(false)
//   // console.log("load to false")
//   fetch(`/getItem`).then(r=>r.json()).then(async (data)=>{
//       // console.log(data.item.id)
//      await setItem(data.item)
//   })
//   .then(()=>{setTimeout(()=>{
//       setIsLoading(true)
//       // console.log("load to true")
//     },5000)})
// }

function getCartList(){
  fetch('/user/cartList').then(r=>r.json()).then(data=>{
    data.cartList.forEach(e =>{
      if(e.id === item.id){
          setAddedCart(true);
      }
    })
  })
}


  function checkIfInWish(){
    console.log("checkInWish")
    fetch("/user/getWishList").then(r=>r.json()).then(data=>{setWishList(data.wishList)}).then(()=>{
      !!wishList && wishList.forEach(e =>{
        if(e.id === item.id){
          setAddedWish(true);
        }
      })
    })
  }

  function AddToCart(){
    let itemId = item.id;
    fetch('/user/addCartList',{
      method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId})
    }).then(()=>{
      getCartList();
    })
    }


       function AddToWishList(){
         if(addedWish)
           return;
         
         let itemId = item.id;
         fetch('/user/addWishList',{
           method:"POST",
           headers:{
             "Content-Type":"application/JSON"
           },
           body:JSON.stringify({itemId})
         }).then(r=>r.json()).then(data=>{
           console.log("added")
          checkIfInWish();
          setAddedWish(true);
         })
       }
return(
  isLoading? (
    <div id="ItemPageDiv">
         <NavBar  Page="ItemPage" />
         <div id="photoDivView"><img alt="imgSrcNull1" id="itemPhoto" src={item.imgsrc} /></div>
    <h1 id="itemTittle">{item.title}</h1>
    <div id="linePriceAndWish" style ={{display:"flex",justifyContent: "space-between"}}>
    <h4 id="itemPrice">Price : {item.price}$</h4> 
    <div  onClick={AddToWishList}>{<WishListButton added={addedWish}/>}</div>
    </div>
    <div style={{margin:"5px",display:'flex'}}>
    {addedCart?<button id="buttonAddedToCart" style={{margin:"auto"}} disabled>Added to cart !</button>:<button id="buttonAddToCart" style={{margin:"auto"}}  onClick={AddToCart}>Add To Cart</button>}
    </div>
   <h3 id="descBorder">Description :</h3>
    <h4 id="itemDescription">{item.descrption}</h4> 
    </div>
):
 (
  <div id="ItemPageDiv">
       <NavBar  Page="ItemPage" />
       <div id="photoDivView"><img alt="imgSrcNull1" id="itemPhoto" src={dataToLoad.otherSrc} /></div>
  <div id="LoadingItems">
      <img alt="imgSrcNull1" src={dataToLoad.imgsrc} />
  </div>
  </div>
)
         )
}
export default withRouter(ItemPage)
