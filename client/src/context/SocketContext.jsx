import { useContext, createContext, useEffect } from "react";
import {io} from "socket.io-client"

const SocketContext= createContext()

const socket = io(import.meta.env.VITE_API_URL,{
    withCredentials: true
})

export const SocketProvider = ({children})=>{
    useEffect(() => {
        return () => socket.disconnect()
        
    },[])
    return(
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
    )
}
const useSocket= () => {
    useContext(SocketContext)
}

// eslint-disable-next-line react-refresh/only-export-components
export default useSocket