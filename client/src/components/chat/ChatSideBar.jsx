// import { useEffect } from "react"
// import { useState } from "react"
import Avatar from "../common/Avatar"
import Search from "../common/Search"
import api from "../../services/Api"
import{User} from "lucide-react"
import {Link, useNavigate} from "react-router-dom"

const ChatSideBar = ({chats, user, setCurrentChat, islogin, setislogin, OnlineUsers}) => {
  const navigate = useNavigate()
  const logout = async() => {
    try {
      let response =await api.post("/user/logout")
      console.log(response.data.message);
      setislogin(false)
      navigate("/")
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <div className="flex flex-col md:gap-5 md:px-5 w-1/3 py-1 border-r ">
      {islogin? (
        <>
        <button className="hidden md:flex w-1/3 px-5  py-1 border text-zinc-400 rounded-md"><User /> Profile</button>
        <a onClick={logout}  className="hidden md:flex w-1/3 py-1 px-5 border text-red-400 rounded-md">logout</a>
        </>
      ):
      <>
        <Link  className="hidden md:flex w-1/3 py-1 px-5  bg-red-400 rounded-md mt-4" to={"/login"}>Login</Link>
        <Link  className="hidden md:flex w-1/3 py-1 px-5  bg-blue-400 rounded-md" to={"/register"}>Register</Link>
        </>
      }
        <div className="mt-4 flex flex-col gap-3">
            <h1 className=" md:text-2xl text-zinc-500">Chats</h1>
            <Search/>
            {islogin&& (
                <>
              {chats.map((chat) => (
                <div
                key={chat._id}
                onClick={() => setCurrentChat(chat)}
                className="cursor-pointer hover:bg-zinc-800 rounded-xl transition-all"
                >
                  <Avatar chat={chat} user={user} OnlineUsers={OnlineUsers} />
                  </div>
                ))}
                </>
              )}
        </div>
    </div>
  )
}

export default ChatSideBar