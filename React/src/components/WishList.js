import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import EachLine from './EachLine'
import NavBar from './NavBar'

 function WishList(props) {
    const [arrayWishList,setArrayWishList] = useState(props.wishListArray) 

    useEffect(()=>{
        fetch('/get-wishList').then(r=>r.json()).then(data=>setArrayWishList(data.wishList))
    },[arrayWishList])


    return (
        <div>
            <NavBar toLink="/ProfilePage" Page="MyProfilePage"/>
            <ul className="list-group">
            {
               arrayWishList.map(e=>{
                 return(
                     <div>
                          <EachLine   type="WishList" e={e} />
                     </div>
                    
                 )   
                })
            }
            </ul>
        </div>
    )
}
export default withRouter(WishList)