import { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import API_KEY from "./apiKey";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatWindowProps {
  onClose: () => void;
}


export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [gptResponse, setGptResponse] = useState('');

  const sendMessage = async (message: string) => {
    if (message.trim() === "") return;
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
    <div className="fixed bottom-0 right-0 w-2/3 h-full bg-[#1d1d1d] text-white flex flex-col justify-end p-4 z-40 rounded-t-lg shadow-lg">
      <div className="flex justify-end p-2">
        <FaTimes className="cursor-pointer text-xl m-2" onClick={onClose} />
      </div>
      <div className="flex-grow overflow-y-auto p-4 custom-scroll">
        {gptResponse && !isLoading && (
          <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-invert max-w-none"
          components={{
            h1: ({ node, ...props }) => <h2 className="text-left" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-left" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-left" {...props} />,
            p: ({ node, ...props }) => <p className="text-left" {...props} />,
            ol: ({ node, ...props }) => (
              // Tailwind: list-decimal for decimal numbering,
              // my-4 for vertical margins (~1em),
              // pl-6 for left padding (~1.5em)
              <ol className="list-decimal my-4 pl-6" {...props} />
            ),
            li: ({ node, ...props }) => <li className="text-left" {...props} />,
            code({ node, inline, className, children, ...props }) {
              // If the code tag is inside a pre, it will be rendered as a block,
              // so use SyntaxHighlighter only for block code.
              if (!inline) {
                const match = /language-(\w+)/.exec(className || "");
                if (match) {
                  return (
                    <SyntaxHighlighter style={materialDark} language={match[1]} {...props}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }
              }
              // Otherwise, render inline code with custom styling.
              return (
                <code
                  className={`bg-[#0e1027] text-white px-1 py-0.5 rounded ${className || ""}`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {gptResponse}
        </ReactMarkdown>
        )}
        {isLoading && (
          <div className="bg-[#44403c] p-4 rounded-lg mb-4 flex">
            <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p>
              Thinking....
            </p>
          </div>
        )}
      </div>
      <div className="relative h-1/7">
        <textarea
          className="w-full p-2 rounded bg-[#595452] text-white h-full resize-none focus:outline-none"
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
