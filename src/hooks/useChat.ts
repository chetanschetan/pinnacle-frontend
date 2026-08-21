// import { useEffect, useState, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// // Ensure this is ONLY the root URL (e.g., https://pinnacle-backend-1-qyyx.onrender.com)
// const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export const useChat = (userId: string) => {
//   const socketRef = useRef<Socket | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//     if (!userId || userId === "undefined") return;

//     // FIX: Clean the URL to ensure no /api suffix exists for the socket handshake
//     const cleanUrl = SOCKET_URL.replace(/\/api$/, "");

//     const socket = io(cleanUrl, { 
//       withCredentials: true,
//       transports: ['websocket'], // FORCE websocket only
//       upgrade: false,             // Prevent trying to upgrade from polling
//       reconnection: true,
//       reconnectionAttempts: 5,
//       timeout: 20000             // Give Render's cold start some time
//     });
    
//     socketRef.current = socket;

//     socket.on('connect', () => {
//       console.log("⚡ Socket Connected:", socket.id);
//       socket.emit('join', String(userId).trim());
//     });

//     // socket.on('receiveMessage', (message: any) => {
//     //   setMessages((prev) => [...prev, message]);
//     // });



    
// // ---------> change made
// socket.on('receiveMessage', (message: any) => {
//   setMessages((prev) => {
//     // Check if message already exists (either by _id or same sender+content+time gap)
//     const isDuplicate = prev.some(
//       (m) =>
//         m._id === message._id ||
//         (m.content === message.content &&
//           m.senderId === message.senderId &&
//           Math.abs(new Date(m.createdAt).getTime() - new Date(message.createdAt).getTime()) < 3000)
//     );

//     if (isDuplicate) return prev;
//     return [...prev, message];
//   });
// });
// // ---------------> change finish



    
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
      upgrade: false,            
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 20000            
    });
    
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log("⚡ Socket Connected:", socket.id);
      socket.emit('join', String(userId).trim());
    });

    // Listen for incoming messages with duplicate check
    socket.on('receiveMessage', (message: any) => {
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (m) =>
            m._id === message._id ||
            (m.content === message.content &&
              m.senderId === message.senderId &&
              Math.abs(new Date(m.createdAt).getTime() - new Date(message.createdAt).getTime()) < 3000)
        );

        if (isDuplicate) return prev;
        return [...prev, message];
      });
    });

    socket.on('connect_error', (err) => {
      console.error("❌ Socket Connection Error:", err.message);
    });

    return () => { 
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

      // 1. Emit to Socket server
      socketRef.current.emit('sendMessage', msgData);

      // 2. Immediately add to local state so it doesn't disappear
      setMessages((prev) => {
        const exists = prev.some(
          (m) => m.content === content && m.senderId === msgData.senderId && Math.abs(new Date(m.createdAt).getTime() - new Date(msgData.createdAt).getTime()) < 2000
        );
        if (exists) return prev;
        return [...prev, msgData];
      });
    }
  };

  return { messages, sendMessage, setMessages };
};