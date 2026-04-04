// import { useEffect, useState, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:5000";

// export const useChat = (userId: string) => {
//   const socketRef = useRef<Socket | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//   // If userId is missing, don't even try to connect
//   if (!userId || userId === "undefined") {
//     console.error("❌ Cannot connect: userId is missing");
//     return;
//   }

//   const socket = io(SOCKET_URL, { withCredentials: true });
//   socketRef.current = socket;

//   socket.on('connect', () => {
//     console.log("⚡ Connected as:", userId);
//     socket.emit('join', String(userId)); // THIS fills the map on the server
//   });

//   socket.on('receiveMessage', (message: any) => {
//     setMessages((prev) => [...prev, message]);
//   });

//   return () => { socket.disconnect(); };
// }, [userId]); // IMPORTANT: This triggers the join when userId finally loads

//   const sendMessage = (receiverId: string, content: string, senderName: string) => {
//     if (socketRef.current) {
//       socketRef.current.emit('sendMessage', {
//         senderId: userId,
//         senderName,
//         receiverId,
//         content,
//       });
//     }
//   };

//   return { messages, sendMessage, setMessages };
// };

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Use the Render URL for Production
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useChat = (userId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!userId || userId === "undefined") return;

    // Use 'websocket' transport to avoid Render's proxy polling delays
    const socket = io(SOCKET_URL, { 
      withCredentials: true,
      transports: ['websocket'],
      upgrade: false
    });
    
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log("⚡ Socket Connected:", socket.id);
      socket.emit('join', String(userId));
    });

    socket.on('receiveMessage', (message: any) => {
      console.log("📩 New Message Received:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => { 
      socket.disconnect(); 
    };
  }, [userId]);

  const sendMessage = (receiverId: string, content: string, senderName: string) => {
    if (socketRef.current) {
      const msgData = {
        senderId: userId,
        senderName,
        receiverId,
        content,
        createdAt: new Date().toISOString()
      };

      // 1. Tell the server to relay it
      socketRef.current.emit('sendMessage', msgData);

      // 2. OPTIONAL: If you want instant feedback for the sender
      // setMessages((prev) => [...prev, msgData]);
    }
  };

  return { messages, sendMessage, setMessages };
};