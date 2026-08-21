import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import API from '../api/axios';

const ChatBox = ({ currentUser, receiverId, receiverName }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const myId = currentUser?._id || currentUser?.id;
  const { messages, sendMessage, setMessages } = useChat(myId);

  useEffect(() => {
    if (isOpen && receiverId && myId) {
      API.get(`/chat/history/${receiverId}`).then(({ data }) => setMessages(data));
    }
  }, [isOpen, receiverId, myId, setMessages]);

  useEffect(() => { 
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!myId) {
    console.log("⏳ ChatBox: Waiting for valid User ID...");
    return null;
  }

  const handleSend = async () => {
  if (!input.trim() || !receiverId) return;

  const textToSend = input;
  const tempId = 'temp_' + Date.now(); // Distinct temp prefix
  const currentUserId = String(myId).trim();
  setInput('');

  // 1. Instant Optimistic UI Update
  const optimisticMessage = {
    _id: tempId,
    senderId: currentUserId,
    senderName: "You",
    content: textToSend,
    createdAt: new Date().toISOString()
  };

  setMessages((prev) => [...prev, optimisticMessage]);

  // 2. Socket Relay (Dusre user ke liye)
  sendMessage(String(receiverId).trim(), textToSend, currentUser.fullName || "User");

  try {
    // 3. Save to Database
    const response = await API.post('/chat/send', {
      receiverId: String(receiverId).trim(),
      content: textToSend
    });
    
    const savedMsg = response.data || response;

    // 4. Replace temp message with real DB message smoothly
    setMessages((prev) =>
      prev.map((msg) => 
        msg._id === tempId 
          ? { ...savedMsg, senderId: currentUserId, senderName: "You" } 
          : msg
      )
    );
  } catch (err: any) {
    console.error("❌ DB Save Failed:", err.message);
  }
};

  return (
    <div className="fixed bottom-10 right-10 z-[10000]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-white">
          <MessageSquare size={28} />
        </button>
      ) : (
        <div className="w-80 h-[500px] bg-white rounded-[2.5rem] shadow-2xl border flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Message Log</span>
              <span className="font-bold text-sm truncate w-40">{receiverName}</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">
            {messages.map((m: any, i: number) => {
              const currentUserId = String(myId || "").trim();
              
              let msgSenderId = "";
              if (m.sender && typeof m.sender === 'object') {
                msgSenderId = String(m.sender._id || m.sender.id || "").trim();
              } else {
                msgSenderId = String(m.senderId || m.sender || "").trim();
              }

              const isMe = currentUserId !== "" && currentUserId === msgSenderId;

              return (
                <div key={m._id || i} className={`flex flex-col mb-3 ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 mb-0.5 px-1">
                    {isMe ? "You" : (receiverName || m.senderName || "Admin")}
                  </span>

                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs font-medium shadow-sm ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              );
            })}    
            <div ref={scrollRef} />
          </div>

          <div className="p-4 border-t bg-white flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-slate-100 p-3 rounded-xl text-xs font-bold outline-none border border-transparent focus:border-blue-500 transition-all"
            />
            <button onClick={handleSend} className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;