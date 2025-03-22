// //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

// import React, { useState } from "react";

// function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Authorization": "Bearer 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",
//           "HTTP-Referer": "<YOUR_SITE_URL>",
//           "X-Title": "<YOUR_SITE_NAME>",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           model: "deepseek/deepseek-r1:free",
//           messages: [...messages, userMessage]
//         })
//       });

//       const data = await response.json();
//       setIsTyping(false); 
//       if (data.choices && data.choices.length > 0) {
//         const botMessage = { role: "assistant", content: data.choices[0].message.content };
//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
//       <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-indigo-600 text-white text-center py-3 text-xl font-semibold">
//           AI ChatBot 🤖
//         </div>

//         {/* Chat Display */}
//         <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-700">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//               {msg.role === "assistant" && (
//                 <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-2">
//                   🤖
//                 </div>
//               )}
//               <div
//                 className={`max-w-xs p-3 rounded-lg shadow text-sm ${
//                   msg.role === "user"
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {/* Typing Indicator */}
//           {isTyping && (
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-2">
//                 🤖
//               </div>
//               <div className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white p-2 rounded-lg text-sm">
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Section */}
//         <div className="flex p-3 bg-white dark:bg-gray-800 border-t">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 p-3 border rounded-l-md focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 dark:text-white"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-r-md transition-all duration-300"
//           >
//             Send 
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatBot;



import React, { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true); // Track first message

  const SYSTEM_PROMPT = {
    role: "system",
    content: "You are a helpful assistant for Techno Club. You can only answer questions related to Techno Club, its events, activities, and membership. If a user asks something unrelated, politely decline to answer."
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = isFirstMessage
      ? [SYSTEM_PROMPT, ...messages, userMessage] // Include system prompt only for first message
      : [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);
    setIsFirstMessage(false); // Ensure system prompt is only sent once

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: updatedMessages
        })
      });

      const data = await response.json();
      setIsTyping(false);
      if (data.choices && data.choices.length > 0) {
        const botMessage = { role: "assistant", content: data.choices[0].message.content };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white text-center py-3 text-xl font-semibold">
          AI ChatBot 🤖
        </div>

        {/* Chat Display */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-700">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-2">
                  🤖
                </div>
              )}
              <div
                className={`max-w-xs p-3 rounded-lg shadow text-sm ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-2">
                🤖
              </div>
              <div className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white p-2 rounded-lg text-sm">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="flex p-3 bg-white dark:bg-gray-800 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border rounded-l-md focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 dark:text-white"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-r-md transition-all duration-300"
          >
            Send 
          </button>
        </div>
      </div>
    </div>


  );
}

export default ChatBot;
