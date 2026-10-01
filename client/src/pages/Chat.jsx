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
  const [OnlineUsers, setOnlineUsers] = useState([])
  const [Istyping, setIstyping] = useState(false)
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const userId = user?._id;
  const loadChats = async () => {
    try {
      const response = await api.get("/conversation/all");
      setChats(response?.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  const handleTyping = ({ conversationId }) => {
    console.log("📥 USER TYPING:", conversationId);

    if (
      currentChat?._id &&
      conversationId?.toString() === currentChat._id.toString()
    ) {
      setIstyping(true);
    }
  };

  const handleStopTyping = ({ conversationId }) => {
    console.log("📥 USER STOP TYPING:", conversationId);

    if (
      currentChat?._id &&
      conversationId?.toString() === currentChat._id.toString()
    ) {
      setIstyping(false);
    }
  };

  socket.on("typing-user", handleTyping);
  socket.on("stop-typing-user", handleStopTyping);

  return () => {
    socket.off("typing-user", handleTyping);
    socket.off("stop-typing-user", handleStopTyping);
  };
}, [socket, currentChat]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (userId) loadChats();
   
  }, [userId]);

  useEffect(() => {
    if(userId) {
      socket.emit("user-online", userId)
    }
    },[userId, socket]
    )
    useEffect(() => {
  const handleMessagesSeen = ({ conversationId }) => {
    if (
      currentChat?._id &&
      conversationId?.toString() === currentChat._id.toString()
    ) {
      setMessage((prev) =>
    prev.map((msg) =>
      msg.sender?._id?.toString() === user?._id?.toString()
        ? { ...msg, seen: true }
        : msg
  )
);
    }
  };

  socket.on("messages-seen", handleMessagesSeen);

  return () => {
    socket.off("messages-seen", handleMessagesSeen);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [socket, currentChat]);
  useEffect(() => {
  const handleReceiveMessage = (message) => {
    console.log("📩 Received:", message);

    // Only add the message if this chat is currently open
    if (currentChat?._id.toString() === message.conversation.toString()) {
      setMessage((prev) => [...prev, message]);
    }

    // Later we'll update the sidebar for other conversations too.
  };

  socket.on("receive-message", handleReceiveMessage);

  return () => socket.off("receive-message", handleReceiveMessage);
}, [socket, currentChat]);

useEffect(() => {
  const handleOnlineUsers = (users) => {
    console.log("🟢 Online Users:", users);
    setOnlineUsers(users);
  };

  socket.on("online-users", handleOnlineUsers);

  return () => {
    socket.off("online-users", handleOnlineUsers);
  };
}, [socket]);
  return (
    <div className="flex h-screen bg-zinc-950 gap-5 md:px-4 py-5 text-white">
      <ChatSideBar
        chats={chats}
        user={user}
        setCurrentChat={setCurrentChat}
        islogin={Islogin}
        setislogin={setIslogin}
        OnlineUsers={OnlineUsers}
      />

      <div className="flex flex-col flex-1">
        <ChatHeader chat={currentChat} user={user} OnlineUsers={OnlineUsers} Istyping={Istyping}/>
        <Chatmessages chats={currentChat} user={user} Message={Message} setMessage={setMessage} />
        <ChatInput chat={currentChat} user={user} Message={Message} setMessage={setMessage} />
      </div>
    </div>
  );
};

export default Chat;