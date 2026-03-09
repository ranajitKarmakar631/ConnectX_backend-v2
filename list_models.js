// const { GoogleGenerativeAI } = require('@google/generative-ai');
// require('dotenv').config();

// async function listModels() {
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   // Using native fetch since listModels might not be in older SDK versions or hard to find
//   const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
  
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.models) {
//       console.log('Available models:');
//       data.models.forEach(m => console.log(`- ${m.name}`));
//     } else {
//       console.log('No models found or error:', data);
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//   }
// }

// listModels();
