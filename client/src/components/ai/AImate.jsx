import { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Divider,
  Chip,
  Card,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

const Background = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundImage: `url(AIbackgroundAiMate.png)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
});

const AImate = () => {
  const [conversationHistory, setConversationHistory] = useState(
    "User: Hello\nChatbot: Hi there!\nUser: How are you?\nChatbot: I'm good, thanks for asking. How about you?\n"
  );
  const [userInput, setUserInput] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceTimeout = useRef(null);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleChatbotResponse = (response) => {
    const newConversation = `User: ${userInput}\nChatbot: ${response}\n`;
    setChatbotResponse(response);
    setConversationHistory((prevHistory) => prevHistory + newConversation);
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
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        };
        const body = {
          conversation_History: conversationHistory,
          user_Input: userInput,
        };
        const response = await fetch("http://localhost:3009/api/response", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        handleChatbotResponse(data);
      } catch (error) {
        console.error(error);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimeout.current);
  }, []);

  return (
    <Background>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            marginTop: 10,
            width: "60%",
            bgcolor: "rgba(0, 0, 0, 0.9)",
          }}
        >
          <Box
            sx={{
              marginBottom: 3,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Chip
              label="AImate | My Mate"
              sx={{ backgroundColor: "#90caf9", color: "black", mr: 1, fontWeight: "bold" }}
            />
            {chatbotResponse && (
              <>
                <Divider orientation="vertical" sx={{ bgcolor: "#90caf9", height: "100%" }} />
                <Box sx={{ mx: 1, maxWidth: "80%" }}>
                  <List sx={{ maxHeight: 200, overflow: "auto" }}>
                    <ListItem alignItems="flex-start" sx={{ py: 0, pl: 0, pr: 1 }}>
                      {/* <ListItemText
                        primary="response:"
                        primaryTypographyProps={{ color: "#90caf9", marginRight: 1, fontWeight: "bold" }}
                      /> */}
                      <ListItemText
                        primary={chatbotResponse}
                        primaryTypographyProps={{ color: "rgba(255,255,255,0.8)" }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </>
            )}
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <OutlinedInput
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)", color: "rgba(255,255,255,0.8)" }}
              fullWidth
              placeholder="ask AImate here"
              size="small"
              value={userInput}
              onChange={handleUserInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" sx={{ color: "#90caf9" }}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </Card>
      </Box>
    </Background>
  );
};

export default AImate;
