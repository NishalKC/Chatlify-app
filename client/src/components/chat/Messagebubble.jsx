import avatar from "../../assets/Nishal.jpg"

const Messagebubble = () => {
  return (
    <div className="md:px-5 md:py-1 py-4 flex flex-col gap-3 ">
        <div className="flex flex-col-reverse gap-1 w-full"> 
            <img src={avatar} className="h-3 w-3 rounded-full" alt="" />
            <p className="bg-zinc-700 w-4/5 md:w-1/2 px-5 py-1 rounded-md self-start">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste esse nulla nemo. Voluptas, rem!</p>
        </div>
       <div className="flex flex-col-reverse gap-1 w-full"> 
            <img src={avatar} className="h-3 w-3 rounded-full" alt="" />
            <p className="bg-zinc-700 w-4/5 md:w-1/2 px-5 py-1 rounded-md self-start">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste esse nulla nemo. Voluptas, rem!</p>
        </div>
        <div className="flex flex-col-reverse gap-1 w-full"> 
            <img src={avatar} className="h-3 w-3 rounded-full" alt="" />
            <p className="bg-zinc-700 w-4/5 md:w-1/2 px-5 py-1 rounded-md self-start">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste esse nulla nemo. Voluptas, rem!</p>
        </div>
        <div className="flex flex-col-reverse gap-1 w-full"> 
            <img src={avatar} className="h-3 w-3 rounded-full" alt="" />
            <p className="bg-zinc-700 w-4/5 md:w-1/2 px-5 py-1 rounded-md self-start">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste esse nulla nemo. Voluptas, rem!</p>
        </div>
        
    </div>
  )
}

export default Messagebubble