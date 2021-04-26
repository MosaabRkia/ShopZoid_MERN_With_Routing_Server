import React, { Component } from "react";
import NavBar from "./NavBar";
import "../cssFile/ContactUs.css";
import { withRouter } from "react-router-dom";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlaseOrTrue: false,
    };
  }
  ShowBar = () => {
    let c = document.getElementById("sel1").value;
    if (c === "Order") {
      this.setState({ FlaseOrTrue: true });
    } else {
      this.setState({ FlaseOrTrue: false });
    }
  };
  GoToPageSucessfully=()=>{
    const { history } = this.props;
    history.push("/PageSucessfullySentContact")

  }

  render() {
    return (
      <div>
        <NavBar Page="MyProfilePage" toLink="/MainPage" />
        <div id="policityAndTerms">
          <h3 id="tittle">policy and terms</h3>
          <p id="parag">
            Terms and Conditions agreements are very helpful for protecting your
            business and letting customers know what is expected of them. Terms
            and Conditions for e-commerce stores typically include clauses that
            give a business the right to terminate an account with a customer if
            certain conditions aren't met or if violations occur, and that limit
            the way a customer can interact with the business. You can typically
            allow customers to create accounts on your website for quicker
            online shopping, order management and tracking, and things like
            loyalty and rewards points for shopping regularly. If your store has
            these features or allows users to create accounts online where they
            can log in and interact with your website, including a Terms and
            Conditions agreement may allow you to: Maintain control over how
            your website can be used Help maintain the integrity of your website
            by allowing you to limit abuses, such as: Spamming Screen-scraping
            And hacking attempts by shutting down accounts that engage in these
            abuses.
          </p>
        </div>
        <div>
          <div class="form-group">
            <label id="tittleselect" for="sel1">Select list (select one):</label>
            <select onChange={this.ShowBar} class="form-control" id="sel1">
              <option value="Scamming">Scamming</option>
              <option value="Failed">Failed Payment</option>
              <option value="Order">Order Problem</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <input
              className="form-group"
              id="orderId"
              type="text"
              placeholder="Order Id:"
              style={{ display: this.state.FlaseOrTrue ? "block" : "none" }}
            />

            <br />
            <label id="tittleselect" for="comment"> Explain your Problem: </label>
            <textarea class="form-control" rows="5" id="comment"></textarea>
          </div>
        </div>
        <div id="buttonContact">
        <button className="btn btn-danger" onClick={this.GoToPageSucessfully}>Submit</button>
        </div>
      </div>
    );
  }
}
export default withRouter(ContactUs)