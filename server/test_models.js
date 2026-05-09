import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = ['gemini-2.0-flash-lite', 'gemini-1.5-flash-8b', 'gemini-pro'];
  
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hi");
      const response = await result.response;
      console.log(`✅ ${m} works: ${response.text().substring(0, 20)}...`);
    } catch (e) {
      console.log(`❌ ${m} failed: ${e.message}`);
    }
  }
}

test();
