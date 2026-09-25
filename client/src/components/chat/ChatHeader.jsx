import { Phone, Video } from "lucide-react"
import avatar from "../../assets/react.svg"

const ChatHeader = () => {
  return (
    <div className="flex justify-between md:px-4 md:py-3  rounded-md w-full bg-zinc-800">
        <div className="flex gap-5 h-fit ">
            <img src={avatar} alt=""  className="p-1 md:h-10 h-8"/>
            <div className="text-[14px] md:text-2xl">
                <h1>Nishal KC</h1>
                <h1 className="text-zinc-500 md:text-[17px]">Online</h1>
            </div>
        </div>
    <div className="p-3 flex gap-6">
        <Phone size={14} className="flex md:hidden"/>
        <Phone size={19+3} className="hidden md:flex"/>
        <Video size={14} className="flex md:hidden"/>
        <Video size={19+5} className="hidden md:flex"/>
    </div>
    </div>
  )
}

export default ChatHeader