import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RequiredAuth from './components/helpers/requireAuth'

import NavBar from './components/NavBar'
import Home from './components/routes/Home'
import SignUp from './components/routes/SignUp'
import Login from './components/routes/Login'
import Logout from './components/routes/Logout'
import MyAccount from './components/routes/MyAccount'
import Thread from './components/routes/Thread'
import Chat from './components/routes/Chat'



function App() {
  

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={< SignUp />}/>
        <Route path='/login' element={< Login />}/>
        <Route path='/myAccount' element={<RequiredAuth withAuth={true} > < MyAccount /> </RequiredAuth>}/>
        <Route path='/thread' element={<RequiredAuth withAuth={true} > < Thread /> </RequiredAuth>}/>
        <Route path='/chat' element={<RequiredAuth withAuth={true} > < Chat /> </RequiredAuth>}/>
        <Route path={'/logout'} element={< Logout />}/>
      </Routes>
    </div>
  )
}

export default App
