import { FaTimes, FaPaperPlane } from "react-icons/fa";

interface ChatWindowProps {
  onClose: () => void;
}


export default function ChatWindow({ onClose }: ChatWindowProps) { 
  return (
    <div className="fixed bottom-0 right-0 w-2/3 h-full bg-slate-800 text-white flex flex-col justify-end p-4 z-40 rounded-t-lg shadow-lg">
      <div className="flex justify-end p-2">
        <FaTimes className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {/* Chat messages will go here */}
      </div>
      <div className="relative">
        <textarea
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-white"
          placeholder="Type your message..."
        />
        <FaPaperPlane className="absolute right-2 bottom-2 cursor-pointer" />
      </div>
    </div>
  );
}
