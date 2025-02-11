import { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import API_KEY from "./apiKey";

interface ChatWindowProps {
  onClose: () => void;
}



export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [gptResponse, setGptResponse] = useState("");

  const sendMessage = async (message: string) => {
    setMessage('');
    setIsLoading(true);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "developer",
            content: "You are a helpful assistant."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    setGptResponse(data.choices[0].message.content)
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-0 right-0 w-2/3 h-full bg-[#332c27] text-white flex flex-col justify-end p-4 z-40 rounded-t-lg shadow-lg">
      <div className="flex justify-end p-2">
        <FaTimes className="cursor-pointer text-xl m-2" onClick={onClose} />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {gptResponse && !isLoading &&(
          <div className="bg-[#44403c] p-4 rounded-lg mb-4">
            <p>{gptResponse}</p>
          </div>
        )}
        {isLoading && (
          <div className="bg-[#44403c] p-4 rounded-lg mb-4">
            <p>
            <svg className="mr-3 size-5 animate-spin bg-sky-50" viewBox="0 0 24 24"></svg>
              Loading....
              </p>
          </div>
        )}
      </div>
      <div className="relative h-1/7">
        <textarea
          className="w-full p-2 rounded bg-[#595452] text-white h-full"
          placeholder="Type your message..."
          value={message}
          onInput={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(message);
            }
          }}
        />
        <FaPaperPlane className="absolute right-2 bottom-2 cursor-pointer text-2xl m-2"
          onClick={() => { sendMessage(message) }}
        />
      </div>
    </div>
  );
}
