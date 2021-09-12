import React ,{useState} from "react";
import '../cssFile/EachListItem.css'
import { Link, withRouter ,useHistory } from 'react-router-dom'

 function EachListItem(props) {
let history = useHistory(); 
// let [arr,setarr] = useState(props.itemFullArray);
function ViewItem(ItemId){
  console.log("joined")
  // fetch('/LoadPageItem',{
  //   method: 'POST',
  //   headers: {"Content-Type":"application/json"},
  //   body:JSON.stringify({ItemId})
  // }).then(r=>r.json()).then((data)=>{
  //   if(data.found === true){
      history.push(`/ItemPage/${ItemId}`);

//     }
// else{
//   alert("Unknown Item")
// }
  // })
}

function AddToCart(){
let itemId = props.Item.id;
fetch('/user/addCartList',{
  method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({itemId})
}).then(()=>{
  props.renderPage();
})
}
  return (
    <li id="profileItem">
         <Link onClick={()=>ViewItem(props.Item.id)}>
      <img alt="imgSrcNull1" id="profileImg" src={props.Item.imgsrc} />
      <h4 id="profileTittle">{props.Item.title}</h4>
      <small id="profilePrice">{props.Item.price}$</small><br/>
      </Link>
      <button disabled={props.Added} onClick={AddToCart} style={{marginBottom:"5px",backgroundColor:props.Added?"gray":"black"}} id="buttonAddToCart">{props.Added?"Already In Cart":"Add to Cart"}</button>
    </li>

  );
}
export default withRouter(EachListItem)