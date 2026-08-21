  import React, { useState, useEffect, useRef } from 'react';
  import { Send, X, MessageSquare } from 'lucide-react';
  import { useChat } from '../hooks/useChat';
  import API from '../api/axios';

  const ChatBox = ({ currentUser, receiverId, receiverName }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // 1. IMPROVED GUARD: If no user ID, don't even initialize the hook logic
    const myId = currentUser?._id || currentUser?.id;
    
    // 2. We initialize the hook only with a valid ID
    // Note: Hooks must be at the top, so we pass myId and handle null inside useChat
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

    // const handleSend = async () => {
    //   if (!input.trim()) return;
    //   const textToSend = input;
    //   setInput(''); 

    //   const newMessage = {
    //     senderId: String(myId),
    //     senderName: "You", 
    //     content: textToSend,
    //     createdAt: new Date().toISOString()
    //   };
      
    //   setMessages((prev) => [...prev, newMessage]);
    //   sendMessage(receiverId, textToSend, currentUser.fullName || "User");

    //   try {
    //     await API.post('/chat/send', { receiverId, content: textToSend });
    //   } catch (err) { 
    //     console.error("DB Error", err); 
    //   }
    // };


    // ... (imports and component start remain the same)
    // const handleSend = async () => {
    // if (!input.trim() || !receiverId) return;
    
    // const textToSend = input;
    // const tempId = Date.now().toString(); 
    // setInput(''); 

    // // 1. UI Update (Instant)
    // const optimisticMessage = {
    //   _id: tempId, 
    //   senderId: String(myId).trim(),
    //   senderName: "You", 
    //   content: textToSend,
    //   createdAt: new Date().toISOString()
    // };
    // setMessages((prev) => [...prev, optimisticMessage]);

    // 2. SOCKET RELAY (Instant - Do this BEFORE the await)
    // This ensures the other person gets it immediately even if the DB is slow
    // sendMessage(String(receiverId).trim(), textToSend, currentUser.fullName || "User");

    // try {
    //   // 3. DATABASE PERSISTENCE (Background)
    //   const { data } = await API.post('/chat/send', { 
    //     receiverId: String(receiverId).trim(), 
    //     content: textToSend 
    //   });

    //   // 4. SYNC UI with DB ID
    //   setMessages((prev) => 
    //     prev.map(msg => msg._id === tempId ? data : msg)
    //   );

    // } catch (err: any) { 
    //   console.error("❌ DB Save Failed:", err.message);
      // If DB fails, we don't necessarily remove it from UI if socket worked, 
      // but usually, it's safer to alert the user.
  //   }
  // };

  // ... (render logic remains the same)


    // --------------------> change made

    // Replace your handleSend function with this:
const handleSend = async () => {
  if (!input.trim() || !receiverId) return;

  const textToSend = input;
  const tempId = Date.now().toString();
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

  // 2. Socket Relay
  sendMessage(String(receiverId).trim(), textToSend, currentUser.fullName || "User");

  try {
    // 3. Save to Database
    const { data } = await API.post('/chat/send', {
      receiverId: String(receiverId).trim(),
      content: textToSend
    });

    // 4. Sync UI state with saved DB response
    setMessages((prev) =>
      prev.map((msg) => (msg._id === tempId ? { ...data, senderId: currentUserId } : msg))
    );
    } catch (err: any) {
    console.error("❌ DB Save Failed:", err.message);
  }
};



    // ---------------------> change finish

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
                // Normalize both IDs to strings and trim whitespace
                const currentUserId = String(myId || "").trim();
                
                // Extract sender ID safely whether it's a populated object, string, or nested ID
                let msgSenderId = "";
                if (m.sender && typeof m.sender === 'object') {
                  msgSenderId = String(m.sender._id || m.sender.id || "").trim();
                } else {
                  msgSenderId = String(m.senderId || m.sender || "").trim();
                }

                // Strict check: Is this message sent by me?
                const isMe = currentUserId !== "" && currentUserId === msgSenderId;

                return (
                  <div key={m._id || i} className={`flex flex-col mb-3 ${isMe ? 'items-end' : 'items-start'}`}>
                    {/* Sender Label */}
                    <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 mb-0.5 px-1">
                      {isMe ? "You" : (receiverName || m.senderName || "Admin")}
                    </span>

                    {/* WhatsApp Style Bubble */}
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
