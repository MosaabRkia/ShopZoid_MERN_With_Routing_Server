import React from 'react'
import { withRouter } from 'react-router-dom'
import '../cssFile/GifImages.css'

function GifImages(props) {
    return (
        <div id="gifImageDiv">
           <img alt="imgSrcNull1" onClick={props.GoLink} id="imageGif" src={props.srcImg} />
        </div>
    )
}
export default withRouter(GifImages)