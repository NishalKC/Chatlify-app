import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

export const SocketProvider = ({ children }) => {

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export  const useSocket = () => useContext(SocketContext);