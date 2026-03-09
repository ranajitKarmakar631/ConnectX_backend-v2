import { Server, Socket } from "socket.io";
import { handleChatEvents } from "./socketChatHandler";
import { UserProfileService } from "../modules/userProfile/userProfile.service";
import {
  UserProfile,
  UserProfileModel,
} from "../modules/userProfile/userProfile.model";
import { redisClient } from "../modules/redis/redisServer";
import {
  deleteKeyCashe,
  getCache,
  setCache,
} from "../modules/redis/redisHandler";

export const onlineUsers = new Map<string, string>();

export const registerSocketHandlers = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    const userId = socket.handshake.auth?.userId;
    const isOnline = await getCache<boolean>(`online:${userId}`);

    if (!isOnline) {
      await setCache(`online:${userId}`, true);
    }

    if (userId) {
      onlineUsers.set(userId, socket.id);

      await UserProfileModel.findOneAndUpdate(
        { userId },
        {
          isOnline: true,
        },
      );

      io.emit("user-online", userId);
    }

    handleChatEvents(io, socket);

    socket.on("disconnect", async () => {
      const isOnline = await getCache<boolean>(`online:${userId}`);

      if (isOnline) {
        await deleteKeyCashe(`online:${userId}`);
      }

      if (userId) {
        onlineUsers.delete(userId);
        await UserProfileModel.findOneAndUpdate(
          { userId },
          {
            isOnline: false,
            lastSeen: new Date(),
          },
        );

        io.emit("user-offline", userId);
      }
    });
  });
};
