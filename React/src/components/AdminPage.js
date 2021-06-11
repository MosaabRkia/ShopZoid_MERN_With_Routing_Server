import React, { useEffect, useState } from 'react'
import CircleButton from './CircleButton'
import NavBar from './NavBar'

export default function AdminPage() {
    let [AdminOrNot,setAdminOrNot] = useState(false)
    useEffect(()=>{
        fetch('/AdminOrNot').then(r=>r.json()).then(data=>{
            // console.log(data)
          if(data.rank === "admin"){
              setAdminOrNot(true)
          }
              else{
                   setAdminOrNot(false)
              }
        })
      },[])

   if(AdminOrNot === true){
    return (
        <div>
                <NavBar Page="Admin"/>
            <CircleButton word="Items Page" toLink="/AllItemsPageAdmin"/>
            <CircleButton word="orders List" fontColor="black" backgroundColor="white" toLink="/OrdersListAdmin"/>
            <CircleButton word="Soon" fontColor="white" backgroundColor="black" toLink="/AdminPage"/>
            <CircleButton word="Soon" fontColor="white" backgroundColor="black" toLink="/AdminPage"/>
        </div>
    )
   }
   else{
       return(
           <div>
           your not admin !
       </div> 
       )
      
   }
}
