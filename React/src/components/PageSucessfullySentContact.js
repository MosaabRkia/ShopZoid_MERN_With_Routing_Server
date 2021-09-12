import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function PageSucessfullySentContact() {
    return (
        <div style={{minWidth:"375px",maxWidth:"600px",margin:"auto"}}>
            <h1>Thank you for Contacting us</h1>
            <Link to="/Home">Go To Main Page..</Link>
        </div>
    )
}
export default withRouter(PageSucessfullySentContact);