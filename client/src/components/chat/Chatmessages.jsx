/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import Messagebubble from './Messagebubble';
import EmptyChat from './EmptyChat';
import api from '../../services/Api';
import { useEffect } from 'react';

const Chatmessages = ({ chats ,user, Message, setMessage}) => {

  const loadAllMessage = async () => {
    if (!chats?._id) return; 

    try {
      let response = await api.get(`message/${chats._id}`);
      console.log(response.data);
      setMessage(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadAllMessage();
  }, [chats?._id]);

  if (!chats) {
    return <EmptyChat />;
  }

  return (
    <div className="h-[95%] md:h-4/5 md:p-7 overflow-auto">
      {Message.map((msg) => (
        <Messagebubble key={msg._id} msg={msg} user={user} />
      ))}
    </div>
  );
};

export default Chatmessages;
