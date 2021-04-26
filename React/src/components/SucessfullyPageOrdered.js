import React from "react";
import {  withRouter } from "react-router-dom";
import CircleButton from "./CircleButton";
import '../cssFile/SucessfullyPageOrdered.css'
function SucessfullyPageOrdered() {
  return (
    <div id="AllDiv">
      <CircleButton
        word="Main Page"
        toLink="/MainPage"
        fontColor="purple"
        backgroundColor="white"
      />
      <br/><br/>
      <h1>Sucessfully Placed Order</h1>
      <br/><br/>
      <CircleButton
        word="My Orders"
        toLink="/MyOrders"
        fontColor="purple"
        backgroundColor="white"
      />
    </div>
  );
}
export default withRouter(SucessfullyPageOrdered);

