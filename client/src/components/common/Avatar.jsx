import avatar from "../../assets/Nishal.jpg"

const Avatar = ({chat, user, OnlineUsers}) => {
    // console.log(user._id);
    let userId = user._id
    let sender = chat.participants.filter((participant) => {
      let send = participant._id !== userId
      return send
       
    }
    )
    const otherUser = chat.participants.find((p)=> p?._id !== userId)
    const isOnline = OnlineUsers.includes(otherUser?._id);
    console.log(isOnline);
    
    
  return (
<div className="md:bg-zinc-800 md:px-3 py-2 rounded-3xl mx-3 flex gap-5 align-middle justify-between ">
    <div className="flex flex-row gap-3">
        <div className="flex flex-row-reverse">
            <img src={avatar} className="h-15 md:h-10 md:w-10 bg-contain rounded-4xl" alt="" />
            {isOnline?(
                <div className="bg-green-600 absolute rounded-2xl p-1 h-fit"></div>
            ):("")}
        </div>
        <div className="hidden md:flex flex-col">
            <h1 >{sender[0].fullname}</h1>
            <p className="text-[13px] text-zinc-300 line-clamp-1"> {chat.latestmessage.text} </p>
        </div>
    </div>
    <div className="gap-1 hidden md:flex">
    <h1 className="text-zinc-400 text-[14px]">3:30 PM</h1>
    <p className="flex  align-middle items-center justify-center rounded-full h-6 w-6 text-xs bg-blue-400 text-white">
        1
    </p>
    </div>

</div>
  )
}

export default Avatar