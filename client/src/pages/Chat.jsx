import ChatSideBar from "../components/chat/ChatSideBar"
import  ChatHeader  from "../components/chat/ChatHeader";
import Chatmessages from "../components/chat/Chatmessages";
import ChatInput from "../components/chat/ChatInput";

const Chat = () => {
  return (
    <div className="flex h-screen bg-zinc-950 gap-5 px-4 py-5 w-full text-white">
      <ChatSideBar/>
    
      <div className="flex flex-col flex-1 ">
        <ChatHeader/>
        <Chatmessages/>
        <ChatInput/>
      </div>
        
    </div>
  )
}

export default Chat