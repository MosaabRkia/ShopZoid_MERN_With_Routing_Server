import React, { useEffect } from 'react'

export default function LoadingPage(props) {
    useEffect(() => {
        // setTimeout(() => {
        //     props.history.push(`/${pageToGo}`)
        // }, 2500);
    })
    return (
        <div style={{width:"100%",height:"100%"}}>
<img style={{width:"100vw",height:"100vw"}} src="https://static.wixstatic.com/media/cfd56a_3c06323b42104ef2ba74a1877b018542~mv2.gif"/>
</div>
    )
}
