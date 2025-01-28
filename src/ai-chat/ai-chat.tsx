import { FaRobot } from "react-icons/fa6";
import { useState } from "react";
import ChatWindow from './ChatWindow';

export default function AiChatIcon() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {!isChatOpen && (
        <div
          className="fixed bottom-4 right-4 z-50 text-4xl cursor-pointer hover:border-2 border-gray-500 rounded-full p-2"
          onClick={() => setIsChatOpen(true)}
        >
          <FaRobot />
        </div>
      )}
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
    </>
  );
}