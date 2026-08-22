// import { useEffect, useState, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export const useChat = (userId: string) => {
//   const socketRef = useRef<Socket | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//     if (!userId || userId === "undefined") return;

//     const cleanUrl = SOCKET_URL.replace(/\/api$/, "");

//     const socket = io(cleanUrl, { 
//       withCredentials: true,
//       transports: ['websocket'],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//       timeout: 20000            
//     });
    
//     socketRef.current = socket;

//     socket.on('connect', () => {
//       console.log("⚡ Socket Connected:", socket.id);
//       socket.emit('join', String(userId).trim());
//     });

//     // Listen for incoming messages with robust duplicate prevention
//     socket.on('receiveMessage', (message: any) => {
//       setMessages((prev) => {
//         const isDuplicate = prev.some(
//           (m) =>
//             m._id === message._id ||
//             (m.content === message.content &&
//              String(m.senderId || m.sender) === String(message.senderId || message.sender) &&
//              Math.abs(new Date(m.createdAt).getTime() - new Date(message.createdAt).getTime()) < 5000)
//         );

//         if (isDuplicate) return prev;
//         return [...prev, message];
//       });
//     });

//     socket.on('connect_error', (err) => {
//       console.error("❌ Socket Connection Error:", err.message);
//     });

//     return () => { 
//       socket.disconnect(); 
//     };
//   }, [userId]);

//   const sendMessage = (receiverId: string, content: string, senderName: string) => {
//     if (socketRef.current?.connected) {
//       const msgData = {
//         senderId: String(userId).trim(),
//         senderName,
//         receiverId: String(receiverId).trim(),
//         content,
//         createdAt: new Date().toISOString()
//       };

//       socketRef.current.emit('sendMessage', msgData);

//       setMessages((prev) => {
//         const exists = prev.some(
//           (m) => m.content === content && String(m.senderId) === String(msgData.senderId) && Math.abs(new Date(m.createdAt).getTime() - new Date(msgData.createdAt).getTime()) < 3000
//         );
//         if (exists) return prev;
//         return [...prev, msgData];
//       });
//     }
//   };

//   return { messages, sendMessage, setMessages };
// };

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useChat = (userId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!userId || userId === "undefined") return;

    const cleanUrl = SOCKET_URL.replace(/\/api$/, "");

    const socket = io(cleanUrl, { 
      withCredentials: true,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000            
    });
    
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log("⚡ Socket Connected:", socket.id);
      socket.emit('join', String(userId).trim());
    });

    // Remove any existing listener to prevent duplicate triggers
    socket.off('receiveMessage');

    socket.on('receiveMessage', (message: any) => {
      setMessages((prev) => {
        // Strict duplicate check using _id or unique content+timestamp match
        const isDuplicate = prev.some(
          (m) =>
            (message._id && m._id === message._id) ||
            (m.content === message.content &&
             String(m.senderId || m.sender) === String(message.senderId || message.sender) &&
             Math.abs(new Date(m.createdAt).getTime() - new Date(message.createdAt).getTime()) < 6000)
        );

        if (isDuplicate) return prev;
        return [...prev, message];
      });
    });

    socket.on('connect_error', (err) => {
      console.error("❌ Socket Connection Error:", err.message);
    });

    return () => { 
      socket.off('receiveMessage');
      socket.disconnect(); 
    };
  }, [userId]);

  const sendMessage = (receiverId: string, content: string, senderName: string) => {
    if (socketRef.current?.connected) {
      const msgData = {
        senderId: String(userId).trim(),
        senderName,
        receiverId: String(receiverId).trim(),
        content,
        createdAt: new Date().toISOString()
      };

      socketRef.current.emit('sendMessage', msgData);
    }
  };

  return { messages, sendMessage, setMessages };
};