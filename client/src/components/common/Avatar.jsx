import avatar from "../../assets/Nishal.jpg"

const Avatar = () => {
  return (
<div className="md:bg-zinc-800 md:px-5 py-2 rounded-3xl mx-3 flex gap-5 align-middle ">
    <div className="flex flex-row gap-3">
        <div className="flex flex-row-reverse">
            <img src={avatar} className="h-15 md:h-10 md:w-17 bg-contain rounded-4xl" alt="" />
            <div className="bg-green-600 absolute rounded-2xl p-1 h-fit"></div>
        </div>
        <div className="hidden md:flex flex-col">
            <h1 >Nishal KC</h1>
            <p className="text-[13px] text-zinc-300 line-clamp-1"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dicta.</p>
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