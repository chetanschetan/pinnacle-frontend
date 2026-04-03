// import { useEffect, useState, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:5000";

// interface IMessage {
//   senderId: string;
//   receiverId: string;
//   content: string;
//   createdAt?: Date | string;
// }

// export const useChat = (userId: string) => {
//   const socketRef = useRef<Socket | null>(null);
//   const [messages, setMessages] = useState<IMessage[]>([]);

//   useEffect(() => {
//     // Initialize Socket
//     socketRef.current = io(SOCKET_URL, {
//       withCredentials: true,
//     });

//     // Join the room
//     socketRef.current.emit('join', userId);

//     // Listen for incoming messages
//     socketRef.current.on('receiveMessage', (message: IMessage) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, [userId]);

//   const sendMessage = (receiverId: string, content: string) => {
//     if (socketRef.current) {
//       const msgData: IMessage = {
//         senderId: userId,
//         receiverId,
//         content,
//         createdAt: new Date(),
//       };
//       // 1. Emit to server for real-time
//       socketRef.current.emit('sendMessage', msgData);
//       // 2. Update local UI immediately
//       setMessages((prev) => [...prev, msgData]);
//     }
//   };

//   return { messages, sendMessage, setMessages };
// };

// import { useEffect, useState, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:5000";

// export const useChat = (userId: string) => {
//   const socketRef = useRef<Socket | null>(null);
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//     socketRef.current = io(SOCKET_URL, { withCredentials: true });

//     socketRef.current.emit('join', userId);

//     socketRef.current.on('receiveMessage', (message: any) => {
//       // FIX: Only add to state if the message is NOT from me
//       // (Because handleSend already added it to our local state)
//       if (String(message.senderId) !== String(userId)) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     return () => { socketRef.current?.disconnect(); };
//   }, [userId]);

//   const sendMessage = (receiverId: string, content: string) => {
//     if (socketRef.current) {
//       socketRef.current.emit('sendMessage', {
//         senderId: userId,
//         receiverId,
//         content,
//       });
//     }
//   };

//   return { messages, sendMessage, setMessages };
// };

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = "http://localhost:5000";

export const useChat = (userId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
  // If userId is missing, don't even try to connect
  if (!userId || userId === "undefined") {
    console.error("❌ Cannot connect: userId is missing");
    return;
  }

  const socket = io(SOCKET_URL, { withCredentials: true });
  socketRef.current = socket;

  socket.on('connect', () => {
    console.log("⚡ Connected as:", userId);
    socket.emit('join', String(userId)); // THIS fills the map on the server
  });

  socket.on('receiveMessage', (message: any) => {
    setMessages((prev) => [...prev, message]);
  });

  return () => { socket.disconnect(); };
}, [userId]); // IMPORTANT: This triggers the join when userId finally loads

  const sendMessage = (receiverId: string, content: string, senderName: string) => {
    if (socketRef.current) {
      socketRef.current.emit('sendMessage', {
        senderId: userId,
        senderName,
        receiverId,
        content,
      });
    }
  };

  return { messages, sendMessage, setMessages };
};