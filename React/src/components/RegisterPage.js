import React, {useEffect, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import "../cssFile/RegisterPage.css";

function RegisterPage(props){
 
  const [firstName,setFirstName] = useState(null);
  const [lastName,setLastName] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [conPassword,setConPassword] = useState(null);
  const [messege,setMassage] = useState(null);
  const [checkSucessfully,setCheckSucessfully] = useState(false);

  function onChangeHandleFName(e){
    setFirstName(e.target.value);
  }

  function onChangeHandleLName(e){
    setLastName(e.target.value);
  }

  function onChangeHandleEmail(e){
    setEmail(e.target.value);
  }

  function onChangeHandlePassword(e){
    setPassword(e.target.value);
  }
  
  function onChangeHandleConPassword(e){
    setConPassword(e.target.value);
  }

 function onClickRegister(e){
    e.preventDefault();
if(password !== conPassword)
{
    setMassage("Passwords not the Same !")
        return;
}

fetch('/Register',{
  method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName,lastName,email,password,conPassword})
}).then(r=>r.json()).then(data=>{
  if(data.registered === true){
    setMassage("Sucessfully Registered Mr/Ms " + firstName)
    setTimeout(()=>{
        setMassage("")
        props.history.push('/');
    }, 3000)
  }
  else{
    setMassage("Email Already Registered , try to Sign in")
  }
})
}


    return (<div>
      <form onSubmit={onClickRegister} className="container RegisterPage">
        <div id="titlesRegisterP">
          <Link to="/">
            <img
              style={{ position: "absolute" }}
              alt="backArrow"
              id="backArrow"
              src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/arrow_left_circle-256.png"
            />
          </Link>
          <img
            id="LOGOReg"
            alt="LOGOReg"
            src="https://i.ibb.co/CbBF9Hn/LOGO.png"
          />
        </div>
        <div id="RegisterForm">
          <h4 id="titleOfRegister">Sign Up</h4>
          <p id="typeForInput">First Name</p>
          <input
            name="firstName"
            onChange={onChangeHandleFName}
            className="makeSpace"
            id="firstNameReg"
            type="text"
            placeholder="Enter First Name"
            required
          />
          <p id="typeForInput">Last Name</p>
          <input
            name="lastName"
            onChange={onChangeHandleLName}
            className="makeSpace"
            id="lastNameReg"
            type="text"
            placeholder="Enter Last Name"
            required
          />
          <p id="typeForInput">Email Adress</p>
          <input
                      name="email"
                      onChange={onChangeHandleEmail}
            className="makeSpace"
            id="emailReg"
            type="email"
            placeholder="Enter Email"
            required
          />
          <p id="typeForInput">Password</p>
          <input
            name="password"
            onChange={onChangeHandlePassword}
            className="makeSpace"
            id="passReg"
            type="password"
            placeholder="Enter Password"
            required
          />
          <p id="typeForInput">Confirm Password</p>
          <input
            name="conPassword"
            onChange={onChangeHandleConPassword}
            className="makeSpace"
            id="conPassReg"
            type="password"
            placeholder="Enter Password Again"
            required/>
          <small>We Never Save Your Password !!!</small>
          <small>{messege}</small>
          <input className="makeSpaceButton" type="submit" value="Sign Up"  />
        </div>
      </form>
      </div>
    );
    }
export default withRouter(RegisterPage) 


