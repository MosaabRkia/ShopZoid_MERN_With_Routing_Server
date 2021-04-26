import React from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'
import '../cssFile/FormPayment.css'

function FormPayment(props) {
  let history = useHistory()


  function checkDetailsVisaAdress(e){
    e.preventDefault();
    // console.log(e)
    // let newVisa = {numberVisa:e.input#ccnum}
fetch('/createNewOrder').then(r=>r.json()).then(data=>{
if(data.orderPlaced === true){
  history.push('/SucessfullyPageOrdered')
}
})
  }

    return (
        <div>     
<div className="row">
  <div className="col-75">
    <div className="container1">
      <form onSubmit={checkDetailsVisaAdress}>
      
        <div className="row">
          <div className="col-50">
            <h3 style={{color:"white"}}>Billing Address</h3><br/><br/>
            <label ></label>
            <input type="text" id="fname" name="firstname" placeholder="First Name" required/><br/>
            <input type="email" id="email" name="email" placeholder="Email" required/><br/>
            <input type="text" id="adr" name="address" placeholder="Address" required/><br/>
            <input type="text" id="city" name="city" placeholder="City" required/><br/>

            <div className="row">
              <div className="col-50">
                <input type="text" id="state" name="state" placeholder="State"  required/>
              </div>
              <div className="col-50">
                <input type="number" id="zip" name="zip" placeholder="Zip"  required/>
              </div>
            </div>
          </div>

          <div className="col-50">
            <h3 style={{color:"white"}}>Payment</h3>
            <label style={{color:"white"}}>Accepted Cards</label>
            <div className="icon-container1">
              <i className="fa fa-cc-visa" style={{color:"navy"}}></i>
              <i className="fa fa-cc-amex" style={{color:"blue"}}></i>
              <i className="fa fa-cc-mastercard" style={{color:"red"}}></i>
              <i className="fa fa-cc-discover" style={{color:"orange"}}></i><br/><br/>
            </div>
            <input type="text" id="cname" name="cardname" placeholder="Name on Card"  required/><br/>
            <input type="number" id="ccnum" name="cardnumber" placeholder="Credit card number"  required/><br/>
            <input type="date" id="expmonth" name="expmonth" placeholder="Exp Month"  required/><br/>
            <div className="row">
              <div className="col-50">
                <input type="number" id="expyear" name="expyear" placeholder="Exp Year"  required/>
              </div>
              <div className="col-50">
                <input type="number" id="cvv" name="cvv" placeholder="CVV"  required/>
              </div>
            </div>
          </div>  
        </div>
       {/*<Link to="/SucessfullyPageOrdered">*/} <input type="submit" style={{background:"white",margin:"5%"}} value="Place Order" className="btn"/>{/*</Link>*/}
      </form>
    </div>
  </div>
 
  </div>
</div>)}
export default withRouter(FormPayment)