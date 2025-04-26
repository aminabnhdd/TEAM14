import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSend } from "react-icons/fi";
import { MdSmartToy } from 'react-icons/md';


import './ChatBot.css';


function ChatBot({projetId}) {
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef(null);



 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  
  useEffect(() => {
    if (!projetId) return;
    const fetchSession = async () => {
      try {
        console.log("befaore /new-session request");
      
        const response = await axios.get(`http://localhost:3001/visualisation/${projetId}/new-session`);
        console.log("after /new-sessin request");
        setSessionId(response.data.sessionId);
        console.log("session id is: ", response.data.sessionId);
      } catch (error) {
        console.error('Failed to fetch session ID:', error);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  
  const toggleVisiblity = async()=>{
    setIsVisible(prev => !prev);
  }

  
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      setMessages((prev) => [...prev, { role: 'user', text: query }]);
      setLoading(true); // Show "Bot is typing..."
      const res = await axios.post(`http://localhost:3001/visualisation/${projetId}/chat`, {
        query,
        sessionId,
      });

      console.log("query is : ");

      setMessages((prev) => [...prev, { role: 'ai', text: res.data.text }]);
      setQuery('');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [...prev, { role: 'ai', text: 'Something went wrong' }]);
    } finally {
      setLoading(false); // Hide "Bot is typing..."
    }
  };

  return (
    <>
    {isVisible &&
    <div className="chat-container">
      <div className="prompt-bar">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Ask something..."
          className="prompt-input"
        />
        <FiSend className="send-icon" onClick={handleClick} />
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === 'user' ? 'query-container' : 'answer-container'}
          >
            <p>{msg.text}</p>
          </div>
        ))}

        {loading && (
          <div className="answer-container">
            <p><em>Bot is typing...</em></p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>}
    <MdSmartToy className="bot-icon" onClick={toggleVisiblity} />
    </>
  );
}

export default ChatBot;

