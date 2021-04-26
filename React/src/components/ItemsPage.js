import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import EachListItem from "./EachListItem";
import NavBar from "./NavBar";

function ItemsPage(props) {
  const [catalogList, setCatalogList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [check, setCheck] = useState(false);
  const [rendered,setRendered] = useState(false);
  useEffect(() => {

    let type = props.typeOfCatalog;
      fetch('/getAllItems',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({type})
      }).then(r=>r.json()).then(data => setCatalogList(data))
    fetch('/get-CartList').then(r=>r.json()).then(data=>setCartList(data.cartList))
  }, []);

  function checkIfInCart(id){
    let x = false;
  cartList.map(e =>{
    if(e.id == id){
     x = true;
    }
  })
  return x;
  }


  function setItemToMain(e,path) {
    props.SetItem(e,path);
  }
  function renderPage() {
    let type = props.typeOfCatalog;
    fetch('/getAllItems',{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({type})
    }).then(r=>r.json()).then(data => setCatalogList(data))

    fetch('/get-CartList').then(r=>r.json()).then(data=>setCartList(data.cartList))  
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
    <div>
      <NavBar Page="ItemsPage" toLink="/MainPage" to="/MainPage" />
<button className="btn btn-primary" onClick={SortItLowToHigh}>Sort By Price Low To High</button>
<button className="btn btn-primary" onClick={SortItHighToLow}>Sort By Price High To Low</button>
      <ul key="list">
        {!!catalogList && catalogList.map((e) => {
          return (
            <EachListItem
              setItemToMain={setItemToMain}
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