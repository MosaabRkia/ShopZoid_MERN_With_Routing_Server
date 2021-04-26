import React, { useEffect, useState } from 'react'
import '../cssFile/LoginPage.css'
import {Animated} from "react-animated-css";
import { Link, withRouter } from 'react-router-dom';
function LoginPage(props) {

    const [message,setMessege] = useState("")
    const [loginEmail,setLoginEmail] = useState()
    const [loginPassword,setLoginPassword] = useState()
    const [sucessLogin,setSucessLogin] = useState(false)


    function CheckLogin(e){
        e.preventDefault();
fetch('/login',{
  method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({loginEmail,loginPassword})
}).then(r=>r.json()).then(data=>{
  if(data.login == "admin"){
    props.history.push("/AdminPage");
  }
  else if(data.login === true){
    props.history.push("/MainPage");
  }
  else{
    setMessege("The email or password you’ve entered is incorrect")
  }
})
 }
 

    
    
  function onChangeHandleEmail(e){
    setLoginEmail(e.target.value);
  };
  function onChangeHandlePassword(e){
   setLoginPassword(e.target.value);
 };


        return (
            <div>
             <Animated animationIn="fadeIn" animationInDuration={1400} animationOutDuration={1400} isVisible={true}>
                <div>
               <img id="imgLogin" alt="ImgLogin" src="https://airspeed.ph/wp-content/uploads/2020/06/The-Importance-of-Courier-Services-for-Online-Shopping-of-Essential-Items.jpg" /> 
               <img id="LOGOlog" alt="LOGOlog" src="https://i.ibb.co/CbBF9Hn/LOGO.png"/>
                </div>
                <form onSubmit={CheckLogin}>
                <div id="DivLoginInputs">
                <p id="typeForInput">Email Adress</p>
                <input name="loginEmail" onChange={onChangeHandleEmail} className="loginInput" id="loginInputEmail" type="email" placeholder="Enter Email Adress" required/>
               <p id="typeForInput" >Password</p>
               <input name="loginPassword" onChange={onChangeHandlePassword} className="loginInput" id="loginInputPassword" type="password" placeholder="Enter Password" required/>
                </div>
               {message}
             <div id="buttonLoginDiv"><input id="ButtonLogin" type="submit" value="Login" /></div>
             </form>
               <div id="goToRegisterFromLogin">
               <Link to="/register">you dont have account already? Register and big Discount !!</Link>
               </div>
               </Animated>
            </div>
        )
    }

export default withRouter(LoginPage) 