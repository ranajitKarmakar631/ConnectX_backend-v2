import { Server, Socket } from "socket.io";
import { onlineUsers } from "./socketServer";
import { MessageService } from "../modules/messages/messages.service";
import { getCache, setCache } from "../modules/redis/redisHandler";

export const handleChatEvents = (io: Server, socket: Socket) => {
  const messageService = new MessageService();

  const userId = socket.handshake.auth?.userId;

  // ==========CHAT=================================================================================================
  // Join chat room
  socket.on("join-room", (chatId: string) => {
    socket.join(chatId);
    // console.log(`👥 Socket ${socket.id} joined room ${chatId}`);
  });

  // Leave chat room
  socket.on("leave-room", (chatId: string) => {
    socket.leave(chatId);
    // console.log(`👋 Socket ${socket.id} left room ${chatId}`);
  });

  // typing in chat
  socket.on("start-typing", (chatId: string) => {
    console.log("typing at chat id", chatId);
    socket.to(chatId).emit("user-typing", {
      userId,
      chatId,
    });
  });

  //leave typing from chat
  socket.on("stop-typing", (chatId: string) => {
    socket.to(chatId).emit("user-stop-typing", {
      userId,
      chatId,
    });
  });
  // Send message to room
  socket.on("send-message", async(data: any) => {
    const { chatId, senderId, message, timestamp } = data;
    
    // console.log(`📨 Message from ${senderId} in room ${chatId}: ${message}`);
    const result = await messageService.create({chatId, senderId, message});
    // Broadcast to all users in the chat room
    const setCashe = await setCache<string>(`lastMessage:${chatId}`,message);
    io.to(chatId).emit("receive-message", {
      id: result?._id,
      chatId,
      senderId,
      message,
      timestamp,
    });
      
  });

  // ============================  CALLING ====================================

  socket.on("start:calling", (data: any) => {
    const { chatId, senderName, senderId,callType,receiverName, receiverId, offer } = data;
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("incoming:call", {
        chatId,
        senderId,
        senderName,
        offer,
        callType
      });
    } else {
      console.log(`Receiver ${receiverId} is offline`);
    }
  });

  socket.on("answer:call", (data: any) => {
    const { to, answer } = data;
    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("answered:call", { answer });
    }
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    // console.log('candidate',candidate);
    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice-candidate", { candidate });
    }
  });

  socket.on("end-call", ({ to }) => {
    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-ended");
    }
  });
};
