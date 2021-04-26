import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../cssFile/CircleButton.css'
 function CircleButton(props) {
    return (
        <div>
            <Link to={props.toLink}>
            <button style={{backgroundColor:`${props.backgroundColor}`,color:`${props.fontColor}`}} id="circleButton" >
                {props.word}
            </button>
            </Link>
            
        </div>
    )
}
export default withRouter(CircleButton)