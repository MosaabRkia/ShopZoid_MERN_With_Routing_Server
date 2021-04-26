import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPageAfterLogin from "./components/MainPageAfterLogin";
import RegisterPage from "./components/RegisterPage";
import { Animated } from "react-animated-css";
import MyProfilePage from "./components/MyProfilePage";
import MyOrders from "./components/MyOrders";
import WishList from "./components/WishList";
import EditProfile from "./components/EditProfile";
import CartPage from "./components/CartPage";
import ItemsPage from "./components/ItemsPage";
import ItemPage from "./components/ItemPage";
import ContactUs from "./components/ContactUs";
import ItemShopArr from './components/Arrays/ItemShopArr'
import AllArrayOfShopsCatalog from './components/Arrays/ItemsPagesArr'
import '../src/cssFile/body.css'
import PaymentPage from "./components/PaymentPage";
import SucessfullyPageOrdered from "./components/SucessfullyPageOrdered";
import PageSucessfullySentContact from "./components/PageSucessfullySentContact";
import AdminPage from "./components/AdminPage";
import OrdersListAdmin from "./components/OrdersListAdmin";

function App(props) {
  const [allItems , setAllItems] = useState();
  const [cartArray,setCartArray] = useState([]);
  const [pathBack , setPathBack] = useState([]);
  const [ArrOrders , setArrOrders] = useState([]);
  const [LastOrder , setLastOrder] = useState();
  const [counterForOrder , setCounterForOrder] = useState();
  const [wishListArray , setWishListArray] = useState([]);



function CreateNewItem(e){
  let temp = allItems;
  temp.push(e)
  setAllItems(temp);
}


function ChangePrice(itemID,newPrice){
    let temp=[];
      allItems.map(item=>{
          if(item.id  === itemID){
              item.price=newPrice;
      }
  temp.push(item);
  })
 setAllItems(temp); 
}

  function RemoveFromWishList(e){
    let newList = wishListArray.filter((item)=>{ return item.id !== e})
    setWishListArray(newList);
  }


function AddOrderPlaced(e){
  setLastOrder(e);
  let temp = ArrOrders;
  temp.push({Order:e});
  setArrOrders(temp);
  setCounterForOrder(counterForOrder+1);
}


  function AddToWishList(e){
      let theItem = allItems.filter((item)=>{ return item.id === e})
      let temp = wishListArray;
      temp.push(theItem[0])
      setWishListArray(temp)
  }

  return (
    <div>
      <Switch>
        <Route exact path="/OrdersListAdmin">
        <OrdersListAdmin/>
        </Route>
        <Route exact path="/AdminPage">
          <AdminPage ChangePrice={ChangePrice} CreateNewItem={CreateNewItem}  />
        </Route>
      <Route exact path="/SucessfullyPageOrdered">
          <SucessfullyPageOrdered />
        </Route>
      
      <Route exact path="/PaymentPage">
          <PaymentPage LastOrder={LastOrder}/>
        </Route>
      
        <Route exact path="/">
          <LoginPage  />
        </Route>

        <Route exact path="/Register">
          <Animated
            animationIn="zoomInDown"
            animationOut="flipOutX"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={true}
          >
            <RegisterPage />
          </Animated>
        </Route>

        {AllArrayOfShopsCatalog.map((e, index) => {
              return (
                //Create Pages With PATH
                <Route exact path={`/ItemsPage-${index}`}>
                  <ItemsPage
                    typeOfCatalog={e.typeOfCatalog}
                  />
                </Route>
              );
            })}

        <Route exact path="/MainPage">
          <Animated
            animationIn="fadeIn"
            animationOut="rotateOutDownRight"
            animationInDuration={2500}
            animationOutDuration={2500}
            isVisible={true}
          >
            <MainPageAfterLogin />

          </Animated>
        </Route>

        <Route exact path="/ProfilePage">
          <MyProfilePage
            imgSrc="https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg"
            name="mosaab abo rkia"
          />
        </Route>

        <Route exact path="/MyOrders">
          <MyOrders  ArrOrders={ArrOrders}/>
        </Route>

        <Route exact path="/WishList">
          <WishList RemoveFromWishList={RemoveFromWishList}  wishListArray={wishListArray}/>
        </Route>

        <Route exact path="/EditProfile">
          <EditProfile />
        </Route>

        <Route exact path="/CartPage">
          <CartPage  AddOrderPlaced={AddOrderPlaced} cartArray={cartArray}/>
        </Route>         

        <Route exact path="/ItemPage">
          <ItemPage   pathBack={pathBack} />
        </Route>

        <Route exact path="/ContactUs" >
          <ContactUs  />
        </Route>

<Route exact path="/EditProfile">
  <EditProfile  />
</Route>

        <Route exact path="/PageSucessfullySentContact">
          <PageSucessfullySentContact />
        </Route>
      </Switch>
    </div>
  );
}
export default withRouter(App)