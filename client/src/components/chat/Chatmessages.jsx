/* eslint-disable react-hooks/exhaustive-deps */
import Messagebubble from './Messagebubble';
import EmptyChat from './EmptyChat';
import api from '../../services/Api';
import { useEffect, useRef } from 'react';

const Chatmessages = ({ chats ,user, Message, setMessage,Typing}) => {
  const bottomRef = useRef();
  const loadAllMessage = async () => {
    // If chats doesn't exist yet, don't execute the API request
    if (!chats?._id) return; 
    try {
      let response = await api.get(`message/${chats._id}`);
      console.log(response.data);
      setMessage(response?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadAllMessage();
  }, [chats?._id]);

    useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
  }, [Message]);

  if (!chats) {
    return <EmptyChat />;
  }


  return (
    <div className="h-[95%] md:h-4/5 md:p-7 overflow-auto">
      {Typing&&(
        <p className="text-sm text-gray-500">Typing...</p>
      )}
      {Message?.map((msg) => (
        <Messagebubble key={msg?._id} msg={msg} user={user} />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Chatmessages;
