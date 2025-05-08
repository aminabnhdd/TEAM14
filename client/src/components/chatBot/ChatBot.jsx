import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSend } from "react-icons/fi";
import { MdSmartToy, MdClose } from 'react-icons/md';
import "./ChatBot.css"
import Tooltip from '../editeur/tooltip';
import ReactMarkdown from 'react-markdown';

function ChatBot({ projetId, isFixed }) {
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSticky,setIsSticky] = useState(false)
  const messagesEndRef = useRef(null);
  const wrapperRef = useRef();
     

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!projetId) return;
    const fetchSession = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chatbot/${projetId}/new-session`);
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error('Échec de la récupération de l\'ID de session:', error);
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

  const toggleVisiblity = () => {
    setIsVisible(prev => !prev);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setMessages((prev) => [...prev, { role: 'user', text: query }]);
      setLoading(true);
      const res = await axios.post(`http://localhost:3001/chatbot/${projetId}/chat`, {
        query,
        sessionId,
      });

      setMessages((prev) => [...prev, { role: 'ai', text: res.data.text }]);
      setQuery('');
    } catch (error) {
      console.error('Erreur lors de la récupération de la réponse:', error);
      setMessages((prev) => [...prev, { role: 'ai', text: 'Désolé, une erreur s\'est produite. Veuillez réessayer.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`fixed right-4 bottom-4 transition-all duration-300 z-10000`}>
      
      {isVisible && (
        <div className="relative w-[40vw] h-[90vh] bg-[color:var(--color-neutral-100)] rounded-[var(--border-radius-8)] flex flex-col overflow-hidden shadow-xl">
          <button
            onClick={toggleVisiblity}
            className="absolute top-3 right-3 w-10 h-10 bg-[color:var(--color-dune)] text-[color:var(--color-black)] rounded-full flex items-center justify-center hover:bg-[color:var(--color-brown)] transition-colors z-10"
            title="Fermer le chat"
          >
            <MdClose className="text-[1.25rem]" />
          </button>

          <div className="bg-[color:var(--color-dune)] text-[color:var(--color-black)] p-4 pl-5 flex items-center gap-3">
            <MdSmartToy className="text-[1.5rem]" />
            <h2 className="font-[600] text-[1.125rem]">Assistant Virtuel d'Athar</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-[color:var(--color-neutral-100)] flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="text-center text-[color:var(--color-neutral-500)] my-auto p-4">
                <MdSmartToy className="text-[2.25rem] mx-auto mb-3 text-[color:var(--color-neutral-400)]" />
                <p className="font-[600] text-[1.125rem]">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
                <p className="text-[0.875rem] mt-2 font-[300]">Posez-moi vos questions sur le projet.</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-[var(--border-radius-8)] text-justify font-[400] text-[1.125rem] ${
                  msg.role === 'user'
                    ? 'ml-auto bg-[color:var(--color-dune)] text-[color:var(--color-black)] rounded-br-[var(--border-radius-0)]'
                    : 'mr-auto bg-[color:var(--color-white)] rounded-bl-[var(--border-radius-0)] shadow-sm border border-[color:var(--color-neutral-300)]'
                }`}
              >
{msg.role === 'ai' ? (
  <div className="prose prose-sm">
    <ReactMarkdown>{msg.text}</ReactMarkdown>
  </div>
) : (
  <p>{msg.text}</p>
)}
              </div>
            ))}

            {loading && (
              <div className="mr-auto bg-[color:var(--color-white)] p-3 rounded-[var(--border-radius-4)] rounded-bl-[var(--border-radius-0)] shadow-sm w-fit border border-[color:var(--color-neutral-300)]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[color:var(--color-dune)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[color:var(--color-dune)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[color:var(--color-dune)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-[color:var(--color-neutral-300)] bg-[color:var(--color-white)]">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Écrivez votre message ici..."
                className="w-full p-3 pr-12 rounded-[var(--border-radius-15)] border border-[color:var(--color-neutral-300)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-dune)] focus:border-transparent font-[400] text-[1.125rem]"
                onKeyPress={(e) => e.key === 'Enter' && handleClick(e)}
              />
              <button
                onClick={handleClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-dune)] hover:text-[color:var(--color-brown)]"
                disabled={loading}
              >
                <FiSend className="text-[1.5rem]" />
              </button>
            </div>
          </div>
        </div>
      )} 
      

      {!isVisible && (
        <Tooltip element = {
        <button 
          onClick={toggleVisiblity}
          className="border border-neutral-400 bg-white rounded-full w-14 h-14 cursor-pointer flex justify-center items-center hover:brightness-105 hover:shadow-lg hover:scale-102 transition-all duration-300"
        >
          <MdSmartToy className="text-[1.5rem] text-[#2d2d2d]" />
        </button> } text="Chat-bot" position="right-10 top-0 "/>
      )}
    </div>
  );
}

export default ChatBot;