import ChatSideBar from "../components/chat/ChatSideBar";
import ChatHeader from "../components/chat/ChatHeader";
import Chatmessages from "../components/chat/Chatmessages";
import ChatInput from "../components/chat/ChatInput";
import api from "../services/Api";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const Chat = ({ user , Islogin, setIslogin}) => {
  const socket = useSocket();
  const [Message, setMessage] = useState([])
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const userId = user?._id;

  const loadChats = async () => {
    try {
      const response = await api.get("/conversation/all");
      setChats(response?.data);

      if (socket && userId) {
        socket.emit("user-online", userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (userId) loadChats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="flex h-screen bg-zinc-950 gap-5 md:px-4 py-5 text-white">
      <ChatSideBar
        chats={chats}
        user={user}
        setCurrentChat={setCurrentChat}
        islogin={Islogin}
        setislogin={setIslogin}
      />

      <div className="flex flex-col flex-1">
        <ChatHeader chat={currentChat} user={user}/>
        <Chatmessages chats={currentChat} user={user} Message={Message} setMessage={setMessage}/>
        <ChatInput chat={currentChat} user={user} Message={Message} setMessage={setMessage}/>
      </div>
    </div>
  );
};

export default Chat;