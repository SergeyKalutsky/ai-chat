import { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

interface ChatWindowProps {
  onClose: () => void;
}


export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  return (
    <div className="fixed bottom-0 right-0 w-2/3 h-full bg-[#332c27] text-white flex flex-col justify-end p-4 z-40 rounded-t-lg shadow-lg">
      <div className="flex justify-end p-2">
        <FaTimes className="cursor-pointer text-xl m-2" onClick={onClose} />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {/* Chat messages will go here */}
      </div>
      <div className="relative h-1/7">
        <textarea
          className="w-full p-2 rounded bg-[#595452] text-white h-full"
          placeholder="Type your message..."
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
        <FaPaperPlane className="absolute right-2 bottom-2 cursor-pointer text-2xl m-2" 
        onClick={() => { console.log(message) }}
        />
      </div>
    </div>
  );
}
