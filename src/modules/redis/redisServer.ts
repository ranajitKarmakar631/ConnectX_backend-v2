import * as dotenv from "dotenv";

dotenv.config();

import { createClient } from "redis";

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    tls: false,
  },
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});


redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("🔄 Connecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis is connected and ready!");
});

redisClient.on("end", () => {
  console.log("⚠️ Redis connection closed");
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();

    // Optional test to confirm working
    await redisClient.set("connection_test", "Redis working 🚀");
    const result = await redisClient.get("connection_test");

    // console.log("📦 Test value from Redis:", result);

  } catch (error) {
    console.error("❌ Failed to connect Redis:", error);
  }
};