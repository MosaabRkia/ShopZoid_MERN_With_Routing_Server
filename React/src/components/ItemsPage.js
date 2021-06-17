import React, { useState, useEffect } from "react";
import { withRouter ,useParams } from "react-router-dom";
import EachListItem from "./EachListItem";
import NavBar from "./NavBar";
import '../cssFile/ItemPage.css'

function ItemsPage(props) {
  let {typeOfCatalog} = useParams();
  console.log(typeOfCatalog)

  const [catalogList, setCatalogList] = useState([]);
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    renderPage();
    // let type = props.typeOfCatalog;
     
  }, []);

  function checkIfInCart(id){
    let x = false;
  cartList.forEach(e =>{
    if(e.id === id){
     x = true;
    }
  })
  return x;
  }


  function setItemToMain(e,path) {
    props.SetItem(e,path);
  }
  function renderPage() {
    fetch('/item/getAllItems',{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({type:typeOfCatalog})
    }).then(r=>r.json()).then(data => setCatalogList(data))
  fetch('/user/cartList').then(r=>r.json()).then(data=>setCartList(data.cartList))
    // let type = props.typeOfCatalog;
    // fetch('/item/getAllItems',{
    //   method:"POST",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body:JSON.stringify({type})
    // }).then(r=>r.json()).then(data => setCatalogList(data))

    // fetch('/user/cartList').then(r=>r.json()).then(data=>setCartList(data.cartList))  
  }
  
  function SortItLowToHigh(){
   catalogList.sort( (a, b)=> {
      return a.price - b.price;
    });
    setCatalogList(catalogList)
    console.log(catalogList)
  }

  function SortItHighToLow(){
    catalogList.sort( (a, b)=> {
       return a.price - b.price;
     });
     setCatalogList(catalogList)
     console.log(catalogList)
   }

  return (
    <div className="fullDiv">
      <NavBar Page="ItemsPage" toLink="/Home" to="/Home" />
      <div id="buttonsSortDiv">
<button id="buttonsSort" onClick={SortItLowToHigh}>Sort By Price Low To High</button>
<button id="buttonsSort" onClick={SortItHighToLow}>Sort By Price High To Low</button>
</div>
      <ul id="ulListItems" key="list">
        {!!catalogList && catalogList.map((e) => {
          return (
            <EachListItem
              setItemToMain={setItemToMain}
              itemFullArray={e}
              renderPage={renderPage}
              Added={checkIfInCart(e.id)}
              Item={e}
              path={`/ItemsPage-${props.index}`}
              />
          );
        })}
      </ul>
    </div>
  );
}

export default withRouter(ItemsPage)