// require('dotenv').config();
// const { OpenRouter } = require('@openrouter/sdk');

// async function testOpenRouter() {
//   try {
//     const apiKey = process.env.OPENROUTER_API_KEY;
//     if (!apiKey) {
//       console.error('❌ OPENROUTER_API_KEY is not defined in .env');
//       // return;
//     }

//     const openRouter = new OpenRouter({
//       apiKey: apiKey,
//     });

//     console.log('Sending request to OpenRouter...');
//     const completion = await openRouter.chat.send({
//       model: 'google/gemini-2.0-flash-001',
//       messages: [{ role: 'user', content: 'Say hello!' }],
//     });

//     console.log('✅ Response:', completion.choices[0].message.content);
//   } catch (error) {
//     console.error('❌ Error:', error.message);
//   }
// }

// testOpenRouter();
