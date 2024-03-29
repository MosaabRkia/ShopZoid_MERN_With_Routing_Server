import React, { Component } from "react";
import CatalogItem from "./CatalogItem";
import GifImages from "./GifImages";
import ImageSlider from "./ImageSlider";
import NavBar from "./NavBar";
import "../cssFile/MainPageAfterLogin.css";
import { Animated } from "react-animated-css";
import AllArrayOfShopsCatalog from "./Arrays/ItemsPagesArr";
import { withRouter } from "react-router-dom";


class MainPageAfterLogin extends Component {
  render() {
    return (
      <div className="fullDiv">
        <NavBar Page="MainPageAfterLogin" />
        <Animated
          animationIn="fadeInUp"
          animationOut="bounceOutDown"
          animationInDuration={2500}
          animationOutDuration={2500}
          isVisible={true}
        >
          <ImageSlider />
          <div id="barsCatalog">
          {
  AllArrayOfShopsCatalog.map((e,index)=>{
  return (<div id="catalogPath">  <CatalogItem 
    ToLink={`/Catalog/${e.typeOfCatalog}`}
    imgSrc={e.imgSrc}
    catalogName={e.typeOfCatalog}
    index={index}
    />
    </div>)
  })
}
          </div>
          <GifImages srcImg="https://thumbs.gfycat.com/UntidyUltimateAlaskanhusky-size_restricted.gif" />
        </Animated>
      </div>
    );
  }
}

export default withRouter(MainPageAfterLogin)