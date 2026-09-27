import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"

import "./App.css"
import api from './services/Api'
import { useEffect, useState } from 'react'

const App = () => {
  const [Islogin, setIslogin] = useState(false)
  const [User, setUser] = useState(null)
  const loaduser = async () => {
    try {
      let response = await api.get("/user/me")
      let user = response.data.user
      if(user) setIslogin(true)
      setUser(user)
      
    } catch (error) {
      console.log(error.message);
      setIslogin(false)
      
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loaduser()
  },[]
  )
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' 
          element={<Chat user={User}  Islogin={Islogin} setIslogin={setIslogin}/>}
          />
          <Route path='/login' 
          element={<Login  setIslogin={setIslogin}/>}
          />
          <Route path='/register' 
          element={<Register setIslogin={setIslogin}/>}
          />

        </Routes>
      </BrowserRouter>
  )
}

export default App