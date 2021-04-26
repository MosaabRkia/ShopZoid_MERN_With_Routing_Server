import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function PageSucessfullySentContact() {
    return (
        <div>
            <h1>Thank you for Contacting us</h1>
            <Link to="/MainPage">Go To Main Page..</Link>
        </div>
    )
}
export default withRouter(PageSucessfullySentContact);