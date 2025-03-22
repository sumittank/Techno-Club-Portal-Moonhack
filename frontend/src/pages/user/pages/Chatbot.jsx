import React, { useState } from "react";
import "../styles/chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: 'Hi! How can I assist you today? 😊', sender: 'bot' }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Techno Clubs Chatbot</h2>
      <div className="chat-window">
        <div className="chat-header">💬 Techno Clubs Chatbot</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
          ))}
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
