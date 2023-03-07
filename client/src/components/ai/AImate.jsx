import { useEffect, useRef, useState } from "react";
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Divider,
  Chip,
  Card,
} from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

const AImate = () => {
  const [conversationHistory, setConversationHistory] = useState("");
  const [userInput, setUserInput] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceTimeout = useRef(null);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleChatbotResponse = (response) => {
    setChatbotResponse(response);
    setConversationHistory(`${conversationHistory}User: ${userInput}\nChatbot: ${response}\n`);
    setUserInput("");
    setIsSubmitting(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.post("/api/response", {
          conversationHistory,
          userInput,
        });
        handleChatbotResponse(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimeout.current);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",

          padding: 2,
          marginTop: 10,
          width: "60%",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Divider>
            <Chip label="AImate" sx={{ backgroundColor: "#90caf9", color: "black" }} />
          </Divider>
          {conversationHistory.split("\n").map((line, index) => (
            <TextField
              fullWidth
              multiline
              rows={10}
              margin="normal"
              variant="outlined"
              label="Conversation history"
              value={conversationHistory}
              InputProps={{ readOnly: true }}
            />
          ))}
          {chatbotResponse && (
            <div>
              <Typography variant="h5" gutterBottom>
                Chatbot response:
              </Typography>
              <Typography variant="body1">{chatbotResponse}</Typography>
            </div>
          )}
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <OutlinedInput
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
            fullWidth
            placeholder="write here"
            size="small"
            value={userInput}
            onChange={handleUserInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SendIcon sx={{ color: "#90caf9", marginLeft: 1 }} />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Card>
    </Box>
  );
};

export default AImate;
