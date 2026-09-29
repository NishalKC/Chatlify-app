import avatar from '../../assets/Nishal.jpg';

// Helper function to format the date display
const formatMessageTime = (dateString) => {
  const messageDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Strip hours/minutes/seconds to compare calendar days accurately
  const isToday = messageDate.toDateString() === today.toDateString();
  const isYesterday = messageDate.toDateString() === yesterday.toDateString();

  const timeString = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) {
    return `Today at ${timeString}`;
  } else if (isYesterday) {
    return `Yesterday at ${timeString}`;
  } else {
    // For older dates, show the actual date and time
    const dateOptions = { month: 'short', day: 'numeric' };
    return `${messageDate.toLocaleDateString([], dateOptions)} at ${timeString}`;
  }
};

const Messagebubble = ({ msg, user }) => {
  console.log(msg);
  
  return (
    <div>
      {user?._id !== msg?.sender?._id ? (
        <div className="md:px-5 py-4 flex flex-col">
          <div className="flex flex-col-reverse w-full">
            <div className="flex gap-3 py-1 align-middle">
              <img src={avatar} className="mt-1 h-3 w-3 rounded-full" alt="" />
              <h1 className="self-start text-[14px] text-zinc-500">
                {formatMessageTime(msg?.createdAt)}
              </h1>
            </div>
            <p className="bg-zinc-700 w-4/5 md:max-w-fit px-5 py-1 rounded-md self-start">{msg?.text}</p>
          </div>
        </div>
      ) : (
        <div className="md:px-5 md:py-1 py-4 flex flex-col">
          <div className="flex flex-col-reverse w-full">
            <div className='flex gap-3 align-middle self-end flex-row-reverse'>
            <img src={avatar} className=" h-3 w-3 rounded-full self-end" alt="" />
            <h1 className="self-end text-[14px] text-zinc-500">
              {formatMessageTime(msg?.createdAt)}
            </h1>
            </div>
            <p className="bg-blue-500 w-4/5 md:max-w-fit px-5 py-1 rounded-md self-end">{msg?.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messagebubble;
