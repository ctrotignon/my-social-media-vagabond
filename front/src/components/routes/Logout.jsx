import React, { useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function Logout() {

    const {user, setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        localStorage.removeItem('token')
        setUser({
            isLogged:false
        })
        setRedirect(true)
    },[])

    if(redirect){
        return <Navigate to="/home"/>
    }

  return (
    <div>logout</div>
  )
}
