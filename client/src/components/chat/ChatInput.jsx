import { Mic, ImagePlus, SmileIcon, ArrowRight, X } from 'lucide-react';
import { useState, useRef } from 'react';
import api from "../../services/Api"
import {useSocket} from "../../context/SocketContext"

const ChatInput = ({chat, user,setMessage}) => {
  const [Text, setText] = useState("")
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const typingTimeout = useRef(null);
  const iconSize = 30;
  const socket = useSocket()
  const handleTyping = (e) => {
  const value = e.target.value;
  setText(value);

  if (!chat || !socket) return;

  const receiverId = chat.participants.find(
    (p) => p?._id !== user?._id
  )?._id;

  socket.emit("typing", {
    receiverId,
    conversationId: chat?._id,
  });

  clearTimeout(typingTimeout.current);

  typingTimeout.current = setTimeout(() => {
    socket.emit("stop-typing", {
      receiverId,
      conversationId: chat?._id,
    });
  }, 1000);
};
 const sendMessage = async (e) => {
  e.preventDefault();   // IMPORTANT

  if (!Text.trim() || !chat) return;

  try {
    const receiverId = chat.participants.find(
      (p) => p?._id !== user?._id
    )?._id;

    const res = await api.post("message/send", {
      conversationId: chat?._id,
      receiverId,
      text: Text,
    });
    socket
    setMessage((prev) => [...prev, res.data]);
    setText("");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger hidden file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove selected image
  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form className="flex flex-col gap-1 bg-zinc-800 px-3 rounded-md" onSubmit={sendMessage}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {preview && (
        <div className="relative mt-2 p-2 bg-zinc-700/50 rounded-md w-fit flex items-center justify-center">
          <img
            src={preview}
            alt="Preview"
            className="h-10 md:h-24 w-10 md:w-[150px] object-cover rounded-md border border-zinc-600"
          />
          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 shadow-md transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="flex gap-3 rounded-md items-center py-2">
        <button type="button" className="hidden md:flex"><Mic size={iconSize} /></button>
        <button type="button" onClick={triggerFileInput} className="hidden md:flex"><ImagePlus size={iconSize} /></button>
        <button type="button" className="hidden md:flex"><SmileIcon size={iconSize} /></button>
        
        <div className="flex gap-1">
          <button type="button" onClick={triggerFileInput} className="flex md:hidden"><ImagePlus size={14}/></button>
          <button type="button" className="flex md:hidden"><Mic size={14}/></button>
          <button type="button" className="flex md:hidden"><SmileIcon size={14}/></button>
        </div>

        {/* Reverted to original width style */}
        <input 
          type="text" 
          value={Text}
          onChange={handleTyping}
          className="w-3/4 px-3 py-3 rounded-2xl bg-zinc-800 text-white outline-none placeholder:text-zinc-400" 
          placeholder="Message.." 
        />
        
        <button type='submit' className="hidden md:flex bg-blue-500 px-1 md:text-xl md:px-5 md:py-1.5 rounded-md text-white">
          Send
        </button>
        <button type='submit' className="md:hidden bg-blue-500 rounded-full p-2 text-white">
          <ArrowRight/>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
