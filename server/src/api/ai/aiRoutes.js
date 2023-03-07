import openai from "openai";
// const openai = require("openai");
import { Router } from "express";

const aiRoutes = Router();

openai.api_key = "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";
console.log("process.env.OPEN_AI_KEY", process.env.OPEN_AI_KEY);
const model_engine = "text-davinci-003";
const chatbot_prompt = `
As an advanced chatbot, your primary goal is to assist users to the best of your ability. This may involve answering questions, providing helpful information, or completing tasks based on user input. In order to effectively assist users, it is important to be detailed and thorough in your responses. Use examples and evidence to support your points and justify your recommendations or solutions.
<conversation history>
User: <user input>
Chatbot:`;

async function getResponse(conversation_history, user_input) {
  const prompt = chatbot_prompt
    .replace("<conversation history>", conversation_history)
    .replace("<user input>", user_input);

  // Get the response from GPT-3
  const response = await openai.Completion.create({
    engine: model_engine,
    prompt: prompt,
    max_tokens: 2048,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  // Extract the response from the response object
  const response_text = response.choices[0].text;

  const chatbot_response = response_text.trim();

  return chatbot_response;
}

aiRoutes.post("/response", async (req, res) => {
  const { conversationHistory, userInput } = req.body;

  const chatbot_response = await getResponse(conversationHistory, userInput);
  res.json(chatbot_response);
});

export default aiRoutes;
