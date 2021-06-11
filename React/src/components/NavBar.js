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
      <img  id="Logo" alt="imgSrcNull12" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
      <img id="ListShow" 
      alt="imgSrcNull1"
      onClick={OpenBar} 
      src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
    </div>

    <NavBarList showOrHide={ShowHide} Page="MyProfilePage" />
    </div>
  );

    case "Admin":
      return (
        <div id="allNavBar">
      <div className="navbar navbar-light ">
        <img id="Logo" alt="LOGOReg1" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        alt="imgSrcNull2"
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page={props.Page} />
      </div>
    );


    case "ItemsPage":
      return (
        <div id="allNavBar">
      <div className="navbar navbar-light ">
   <Link to={props.to}>  <img  alt="backArrow1" id="backArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/></Link>
        <img id="Logo" alt="LOGOReg3" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        alt="imgSrcNull4"
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page="MyProfilePage" />
      </div>
    );


    case "ItemPage":
      return (
        <div id="allNavBar">
      <div className="navbar navbar-light ">
     <img onClick={gobackfunction} alt="backArrow" id="backArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/>
        <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        alt="imgSrcNull1"
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page="MyProfilePage" />
      </div>
    );

    case "MainPageAfterLogin":
      return (
        <div id="allNavBar">
      <div  className="navbar navbar-light ">
        <Link to='/CartPage'>
        <img
        alt="imgSrcNull1"
        style={{width:"50px",height:"50px"}}
          src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/shopping-cart-shop-drop-trolly-128.png"
        />
        </Link>
        <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
        <img id="ListShow" 
        alt="imgSrcNull1"
        className={ShowHide ? "Show" : "Hide"} 
        onClick={OpenBar} 
        src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
  
      </div>
      <NavBarList showOrHide={ShowHide} Page="MainPageAfterLogin"/>
      </div>
    );

      case "CartPage":
        return (
          <div id="allNavBar">
        <div  className="navbar navbar-light">
          <Link to={props.toLink}><img alt="backArrow" id="backArrow" src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"/></Link>      
          <img id="Logo" alt="LOGOReg56" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
          <img id="ListShow" 
          alt="imgSrcNull1"
          className={ShowHide ? "Show" : "Hide"} 
          onClick={OpenBar} 
          src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
    
        </div>
        <NavBarList showOrHide={ShowHide} Page="MainPageAfterLogin"/>
        </div>
      );
      

         case "PaymentPage":
        return (
          <div id="allNavBar">
        <div  className="navbar navbar-light">
          <img id="Logo" alt="LOGORega" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
          <img id="ListShow" 
          alt="imgSrcNull1"
          className={ShowHide ? "Show" : "Hide"} 
          onClick={OpenBar} 
          src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />
    
        </div>
        <NavBarList showOrHide={ShowHide} Page="MainPageAfterLogin"/>
        </div>
      );

  default:
    return (
      <div id="allNavBar">
    <div  className="navbar navbar-light">
    <img
    alt="imgSrcNull515"
        id="cartButton"
        src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/shopping-cart-shop-drop-trolly-128.png"
      />
      <img id="Logo" alt="LOGOReg" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
      <img id="ListShow" 
      alt="imgSrcNull1"
      className={ShowHide ? "Show" : "Hide"} 
      onClick={OpenBar} 
      src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/menu10-128.png" />

    </div>
    <NavBarList showOrHide={ShowHide} />
    </div>
  );
}
  
}
export default withRouter(NavBar)