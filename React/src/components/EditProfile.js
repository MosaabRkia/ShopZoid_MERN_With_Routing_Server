import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import '../cssFile/EditProfile.css';
import { withRouter } from "react-router-dom";

 function EditProfile(props) {

  const [HideShowEmail, setHideShowEmail] = useState(false);
  const [HideShowPassoword, setHideShowPassoword] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [oldEmail, setOldEmail] = useState();
  const [newEmail, setNewEmail] = useState();
  const [message, setMessage] = useState();
  const [changed, setChanged] = useState(false);


// note the state when changed to regular make problems
  function showDivChangeEmail() {
    setHideShowEmail(!HideShowEmail);
  }

  function showDivChangePassword() {
    setHideShowPassoword(!HideShowPassoword);
  }
  function HandleOldEmail(e){
  setOldEmail(e.target.value);
  }

  function HandleNewEmail(e){
  setNewEmail(e.target.value);
  }
  
  function HandleOldPassword(e){
  setOldPassword(e.target.value)
  }

  function HandleNewPassword(e){
    setNewPassword(e.target.value)
  }

  function ChangeEmail(e){
    e.preventDefault();

    fetch('/changeEmail',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
body:JSON.stringify({oldEmail,newEmail})
    }).then(r=>r.json()).then(data=>{
      setChanged(data.changed)
    })
    if(changed){
      setMessage("sucessfully Changed Email!")
      setHideShowEmail(false);
    }
    else{
      setMessage("ops something wrong!") 
    }
  }

  function ChangePassword(e){
    e.preventDefault();
    fetch('/changePassword',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
body:JSON.stringify({oldPassword,newPassword})
    }).then(r=>r.json()).then(data=>{
      setChanged(data.changed)
    })
    if(changed){
      setMessage("sucessfully Changed Password!")
      setHideShowPassoword(false);
    }
    else{
      setMessage("ops something wrong!") 
    }
  }



  return (
    <div className="container" style={{textAlign:'center'}}>
        <NavBar Page="MyProfilePage" toLink="/ProfilePage" />
        <h1>Edit Profile</h1>
        <h1>{message}</h1>
        <div id="formOfEmail">
      <button id="showButton" style={{margin:"178px 10px 10px 8px"}} className={HideShowEmail?"btn btn-primary":"btn btn-danger"} onClick={showDivChangeEmail}>Change Email</button>

      <form onSubmit={ChangeEmail} className="form-group" style={{display:HideShowEmail?'block':'none'}}>
        <input className="form-control" type="email" onChange={HandleOldEmail} placeholder="Old Email" required />
        <input className="form-control" type="email" onChange={HandleNewEmail} placeholder="New Email" required />
        <button type="submit"  className="btn btn-primary">Submit</button>
        </form>
      </div>
  <form onSubmit={ChangePassword} id="formOfPassword">
      <button id="showButton" style={{margin:"178px 10px 10px 8px"}} className={HideShowPassoword?"btn btn-primary":"btn btn-danger"} onClick={showDivChangePassword}>Change Password</button>
      <div className="form-group" style={{display:HideShowPassoword?'block':'none'}}>
        <input className="form-control" type="password" onChange={HandleOldPassword} placeholder="Old Password" required />
        <input className="form-control" type="password" onChange={HandleNewPassword}  placeholder="New Password"  required/>
        <button type="submit"  className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default withRouter(EditProfile)