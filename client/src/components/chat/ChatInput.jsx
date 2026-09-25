import {Mic, ImagePlus, SmileIcon,  ArrowRight } from "lucide-react"

const ChatInput = () => {
  const iconSize = 30
  return (
    <div className="flex gap-3">
      <button className="hidden md:flex" ><Mic size={iconSize} /></button>
      <button className="hidden md:flex" ><ImagePlus size={iconSize} /></button>
      <button className="hidden md:flex" ><SmileIcon size={iconSize} /></button>
      <button className="flex md:hidden mt-5"><Mic size={14}/></button>
      <button className="flex md:hidden mt-5"><ImagePlus size={14}/></button>
      <button className="flex md:hidden mt-5"><SmileIcon size={14}/></button>
      
      <input type="text" className="w-3/4 px-3 py-3  rounded-2xl bg-zinc-800" placeholder="Message.."/>
        <button className="hidden md:flex bg-blue-500 px-1 md:text-xl md:px-5 md:py-1.5 rounded-md">Send </button>
        <button className="bg-blue-500 rounded-2xl px-2"><ArrowRight/></button>

    </div>
  )
}

export default ChatInput