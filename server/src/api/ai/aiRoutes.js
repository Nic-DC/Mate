import openai from "openai";
import dotenv from "dotenv";
dotenv.config();
// const openai = require("openai");
import { Router } from "express";

const { Configuration, OpenAIApi } = openai;

const configuration = new Configuration({
  apiKey: "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",
});
const openaiInstance = new OpenAIApi(configuration);

const aiRoutes = Router();

const model_engine = "text-davinci-003";
const chatbot_prompt = `
As an advanced chatbot, your primary goal is to assist users to the best of your ability. This may involve answering questions, providing helpful information, or completing tasks based on user input. In order to effectively assist users, it is important to be detailed and thorough in your responses. Use examples and evidence to support your points and justify your recommendations or solutions.
<conversation history>
User: <user input>
Chatbot:`;
async function getResponse(conversation_History, user_Input) {
  const prompt = chatbot_prompt
    .replace("<conversation history>", conversation_History)
    .replace("<user input>", user_Input);

  const response = await openaiInstance.createCompletion({
    model: model_engine,
    prompt: prompt,
    max_tokens: 2048,
    n: 1,
    stop: null,
    temperature: 0.5,
  });
  console.log("response: ", response);
  console.log("response.choices:", response.data.choices);

  const response_text = response.data.choices[0].text;
  const chatbot_response = response_text.trim();

  return chatbot_response;
}

aiRoutes.post("/response", async (req, res) => {
  const { conversation_History, user_Input } = req.body;

  const chatbot_response = await getResponse(conversation_History, user_Input);
  res.json(chatbot_response);
});

export default aiRoutes;
