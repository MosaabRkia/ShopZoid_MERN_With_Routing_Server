import React from "react";
import '../cssFile/NavBarList.css'
import {Animated} from "react-animated-css";
import { Link, withRouter } from "react-router-dom";

 function NavBarList(props) {
   function logout(){
     fetch('/login').then(r=>r.json()).then(data=>{console.log(data)})
   }
 switch (props.Page) {
   case "MyProfilePage":
    return (
      <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1500} animationOutDuration={1500} isVisible={props.showOrHide}>
      <div className="BarList" id={props.showOrHide ? "Show" : "Hide"}>
        <ul className="list-group">
        <Link to="/ProfilePage" style={{ textDecoration: 'none' }}><li className="list-group-item" >My Profile</li></Link>
         <Link to="/ContactUs" style={{ textDecoration: 'none' }}><li  className="list-group-item">Contact Us</li></Link>
         <Link to="/" style={{ textDecoration: 'none' }}> <li onClick={logout} className="list-group-item">Log Out</li></Link> 
        </ul>
      </div>
      </Animated>
    );
     break;

     case "Admin":
      return (
        <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1500} animationOutDuration={1500} isVisible={props.showOrHide}>
        <div className="BarList" id={props.showOrHide ? "Show" : "Hide"}>
          <ul className="list-group">
           <Link to="/" style={{ textDecoration: 'none' }}> <li onClick={logout}  className="list-group-item">Log Out</li></Link> 
          </ul>
        </div>
        </Animated>
      );
       break;

     case "MainPageAfterLogin":
      return (
        <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1500} animationOutDuration={1500} isVisible={props.showOrHide}>
        <div className="BarList" id={props.showOrHide ? "Show" : "Hide"}>
          <ul className="list-group">
        <Link to="/ProfilePage" style={{ textDecoration: 'none' }}><li  className="list-group-item" >My Profile</li></Link>
         <Link to="/ContactUs" style={{ textDecoration: 'none' }}><li  className="list-group-item">Contact Us</li></Link>
         <Link to="/" style={{ textDecoration: 'none' }}> <li onClick={logout}  className="list-group-item">Log Out</li></Link> 
          </ul>
        </div>
        </Animated>
      );
       break;

       case "ContactUs":
      return (
        <Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1500} animationOutDuration={1500} isVisible={props.showOrHide}>
        <div className="BarList" id={props.showOrHide ? "Show" : "Hide"}>
          <ul className="list-group">
        <Link to="/ProfilePage" style={{ textDecoration: 'none' }}><li  className="list-group-item" >My Profile</li></Link>
         <Link disabled id="selected"  style={{ textDecoration: 'none' }}><li  className="list-group-item">Contact Us</li></Link>
         <Link to="/" style={{ textDecoration: 'none' }}> <li onClick={logout}   className="list-group-item">Log Out</li></Link> 
          </ul>
        </div>
        </Animated>
      );
       break;
   default:
     break;
 }
}
export default withRouter(NavBarList)