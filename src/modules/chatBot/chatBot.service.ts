// import { OpenRouter } from "@openrouter/sdk";

// const openRouter = new OpenRouter({
//   apiKey: process.env.OPENROUTER_API_KEY!,
//   defaultHeaders: {
//     "HTTP-Referer": "http://localhost:3000",
//     "X-OpenRouter-Title": "ConnectX AI",
//   },
// });

// export const askChatBot = async (message: string): Promise<string> => {
//   try {
//     const completion = await openRouter.chat.send({
//       model: "google/gemini-2.0-flash-001",
//       messages: [{ role: "user", content: message }],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     return (completion.choices[0].message as any).content;
//   } catch (error: any) {
//     console.error("OpenRouter Service Error:", error);
//     throw new Error(error?.message || "AI service failed");
//   }
// };
