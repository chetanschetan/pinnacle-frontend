// import React, { useState, useEffect, useRef } from 'react';
// import { Send, X, MessageSquare } from 'lucide-react';
// import { useChat } from '../hooks/useChat';
// import API from '../api/axios';

// const ChatBox = ({ currentUser, receiverId, receiverName }: any) => {

//   if (!currentUser || !currentUser._id) {
//     console.log("⏳ Waiting for currentUser data...");
//     return null; // Don't render the chat until we know who YOU are
//   }
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState('');
//   const { messages, sendMessage, setMessages } = useChat(currentUser._id);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (isOpen && receiverId) {
//       API.get(`/chat/history/${receiverId}`).then(({ data }) => setMessages(data));
//     }
//   }, [isOpen, receiverId, setMessages]);

//   useEffect(() => { 
//     if (isOpen) {
//       scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const textToSend = input;
//     setInput(''); 

//     // Manual append for instant UI
//     const newMessage = {
//       senderId: String(currentUser._id),
//       senderName: "You", 
//       content: textToSend,
//       createdAt: new Date().toISOString()
//     };
//     setMessages((prev) => [...prev, newMessage]);

//     // Send via socket to the other user
//     sendMessage(receiverId, textToSend, currentUser.fullName);

//     try {
//       await API.post('/chat/send', { receiverId, content: textToSend });
//     } catch (err) { 
//       console.error("DB Error", err); 
//     }
//   };

//   return (
//     <div className="fixed bottom-10 right-10 z-[10000]">
//       {!isOpen ? (
//         <button 
//           onClick={() => setIsOpen(true)} 
//           className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-white"
//         >
//           <MessageSquare size={28} />
//         </button>
//       ) : (
//         <div className="w-80 h-[500px] bg-white rounded-[2.5rem] shadow-2xl border flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
//           <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
//             <div className="flex flex-col">
//               <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Message Log</span>
//               <span className="font-bold text-sm truncate w-40">{receiverName}</span>
//             </div>
//             <button onClick={() => setIsOpen(false)}><X size={20} /></button>
//           </div>

//           <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">
//             {messages.map((m: any, i: number) => {
//               const currentUserId = String(currentUser?._id || currentUser?.id || "").trim();
  
//               // Logic: Check all possible sender fields from both Socket and DB History
//               const msgSenderId = String(m.senderId || m.sender?._id || m.sender || "").trim();

//               if (i === messages.length - 1) {
//               console.log("--- DEBUG START ---");
//               console.log("1. CurrentUser Object:", currentUser);
//               console.log("2. Comparison: Is", currentUserId, "equal to", msgSenderId, "?");
//               console.log("3. Result (isMe):", currentUserId === msgSenderId);
//               console.log("--- DEBUG END ---");
//   }
              
//               const isMe = currentUserId === msgSenderId && currentUserId !== "";

//               return (
//                 <div key={i} className="flex flex-col space-y-1 items-start">
//                   <span className={`text-[9px] font-black uppercase tracking-tighter ${isMe ? 'text-blue-600' : 'text-slate-400'}`}>
//                     {/* If isMe is true, it is impossible for it to show your name */}
//                     {isMe ? "You" : (m.senderName || receiverName)}
//                   </span>

//                   {/* BUBBLE - Always Left Aligned */}
//                   <div className={`max-w-[90%] p-3 rounded-2xl text-[11px] font-bold shadow-sm rounded-tl-none border ${
//                     isMe 
//                     ? 'bg-slate-100 text-slate-900 border-slate-200' 
//                     : 'bg-white text-slate-700 border-slate-100'
//                   }`}>
//                     {m.content}
//                   </div>
//                 </div>
//               );
//             })}
//             <div ref={scrollRef} />
//           </div>

//           <div className="p-4 border-t bg-white flex gap-2">
//             <input 
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Type a message..."
//               className="flex-1 bg-slate-100 p-3 rounded-xl text-xs font-bold outline-none border border-transparent focus:border-blue-500 transition-all"
//             />
//             <button onClick={handleSend} className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all">
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBox;

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

  const handleSend = async () => {
    if (!input.trim()) return;
    const textToSend = input;
    setInput(''); 

    const newMessage = {
      senderId: String(myId),
      senderName: "You", 
      content: textToSend,
      createdAt: new Date().toISOString()
    };
    
    setMessages((prev) => [...prev, newMessage]);
    sendMessage(receiverId, textToSend, currentUser.fullName || "User");

    try {
      await API.post('/chat/send', { receiverId, content: textToSend });
    } catch (err) { 
      console.error("DB Error", err); 
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
              const currentUserId = String(myId).trim();
              const msgSenderId = String(m.senderId || m.sender?._id || m.sender || "").trim();
              const isMe = currentUserId === msgSenderId && currentUserId !== "";

              return (
                <div key={i} className="flex flex-col space-y-1 items-start">
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${isMe ? 'text-blue-600' : 'text-slate-400'}`}>
                    {isMe ? "You" : (m.senderName || receiverName)}
                  </span>
                  <div className={`max-w-[90%] p-3 rounded-2xl text-[11px] font-bold shadow-sm rounded-tl-none border ${
                    isMe ? 'bg-slate-100 text-slate-900 border-slate-200' : 'bg-white text-slate-700 border-slate-100'
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