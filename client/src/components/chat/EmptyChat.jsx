import {MessageCircle} from "lucide-react"
const EmptyChat = () => {
  return (
    <div className="flex flex-col min-h-4/5 items-center text-center justify-center gap-1">
      <h1><MessageCircle  size={37}/></h1>
      <p>Select a conversation to Start Chatting</p>
      <h1 className="bg-blue-500 px-5 py-1.5 rounded-md cursor-pointer">Add</h1>
    </div>
  )
}

export default EmptyChat