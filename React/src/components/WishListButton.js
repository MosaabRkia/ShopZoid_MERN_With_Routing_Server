import React, { useState } from 'react'

export default function WishListButton(props) {
    return(
        props.added? 
    (
        <div style={{width:"100%"}}>
        <img disabled style={{width:"5vw",margin:'5px'}} src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-256.png"/>
        </div>
        ):
        (
        <div style={{width:"100%"}}>
            <img style={{width:"5vw",margin:'5px'}} src="https://cdn0.iconfinder.com/data/icons/business-office-1-7/55/35-256.png"/>
        </div>
        )
        )
    
    
}
