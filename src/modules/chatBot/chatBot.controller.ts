// import { Request, Response } from "express";
// import * as chatBotService from "./chatBot.service";

// export const handleGeminiChat = async (
//   req: Request,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     const  message  = "how are you?";

//     if (!message || typeof message !== "string") {
//       return res.status(400).json({
//         success: false,
//         error: "Message is required and must be a string",
//       });
//     }

//     const reply = await chatBotService.askChatBot(message);

//     return res.status(200).json({
//       success: true,
//       reply,
//     });
//   } catch (error: any) {
//     console.error("ChatBot Controller Error:", error);
//     return res.status(500).json({
//       success: false,
//       error: error?.message || "AI service failed",
//     });
//   }
// };
