// import { useEffect } from "react"
import Avatar from "../common/Avatar"
import Search from "../common/Search"
// import api from "../../services/Api"
import{User} from "lucide-react"

const ChatSideBar = () => {
  // const getallconversation= async() => {
  //   try{
  //       let response = await api.get("conversation/all")
  //       console.log(response);
        
  //   }catch(err){
  //     console.log(err.message);
      
  //   }
  // }
  
  // useEffect(() => {
  //   getallconversation()
  // },[]
  // )

  return (
    <div className="flex flex-col md:gap-5 md:px-5 w-1/3 py-1 border-r ">
        <button className="hidden md:flex w-1/3 py-1 border text-zinc-400 rounded-md"><User /> Profile</button>
        <button className="hidden md:flexw-1/3 py-1 border text-red-400 rounded-md">logout</button>
        <div className="mt-4 flex flex-col gap-3">
            <h1 className=" md:text-2xl text-zinc-500">Chats</h1>
            <Search/>
            <Avatar/>
        </div>
    </div>
  )
}

export default ChatSideBar