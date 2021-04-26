import React, { useState } from "react";
import "../cssFile/NavBar.css";
import NavBarList from "./NavBarList";
import { Link, useHistory, withRouter } from 'react-router-dom'

 function NavBar(props) {
  const [ShowHide, setShowHide] = useState(false);
//const [nameOfTheState,setNameOfTheState] = useState(firstValue);
let history = useHistory();

  function OpenBar() {
    setShowHide(!ShowHide);
  }
  function gobackfunction(){
    history.goBack();
    history.goBack();
  }

switch (props.Page) {
  case "MyProfilePage":
    return (
      <div id="allNavBar">
    <div className="navbar navbar-light ">
    <Link to={props.toLink}><img alt="backArrow" id="backArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/></Link>
      <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
      <img id="ListShow" 
      onClick={OpenBar} 
      src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
    </div>

    <NavBarList showOrHide={ShowHide} Page="MyProfilePage" />
    </div>
  );
    break;

    case "Admin":
      return (
        <div id="allNavBar">
      <div className="navbar navbar-light ">
        <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page={props.Page} />
      </div>
    );
      break;


    case "ItemsPage":
      return (
        <div id="allNavBar">
      <div className="navbar navbar-light ">
   <Link to={props.to}>  <img  alt="backArrow" id="backArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/></Link>
        <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page="MyProfilePage" />
      </div>
    );
      break;


    case "ItemPage":
      return (
        <div id="allNavBar">
      <div className="navbar navbar-light ">
     <img onClick={gobackfunction} alt="backArrow" id="backArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/>
        <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page="MyProfilePage" />
      </div>
    );
      break;

    case "MainPageAfterLogin":
      return (
        <div id="allNavBar">
      <div  className="navbar navbar-light ">
        <Link to='/CartPage'>
        <img
          id="cartButton"
          src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/shopping-cart-shop-drop-trolly-128.png"
        />
        </Link>
        <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page="MainPageAfterLogin"/>
      </div>
    );
      break;

      case "CartPage":
        return (
          <div id="allNavBar">
        <div  className="navbar navbar-light">
          <Link to={props.toLink}><img alt="backArrow" id="backArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/></Link>      
          <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
          <img id="ListShow" 
          className={ShowHide ? "Show" : "Hide"} 
          onClick={OpenBar} 
          src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
    
        </div>
        <NavBarList showOrHide={ShowHide} Page="MainPageAfterLogin"/>
        </div>
      );
      break;
      

         case "PaymentPage":
        return (
          <div id="allNavBar">
        <div  className="navbar navbar-light">
          <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
          <img id="ListShow" 
          className={ShowHide ? "Show" : "Hide"} 
          onClick={OpenBar} 
          src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
    
        </div>
        <NavBarList showOrHide={ShowHide} Page="MainPageAfterLogin"/>
        </div>
      );
      break;

  default:
    return (
      <div id="allNavBar">
    <div  className="navbar navbar-light">
    <img
        id="cartButton"
        src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/shopping-cart-shop-drop-trolly-128.png"
      />
      <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
      <img id="ListShow" 
      className={ShowHide ? "Show" : "Hide"} 
      onClick={OpenBar} 
      src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />

    </div>
    <NavBarList showOrHide={ShowHide} />
    </div>
  );
    break;
}
  
}
export default withRouter(NavBar)