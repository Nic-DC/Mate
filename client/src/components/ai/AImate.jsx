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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

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
    console.log("submit");
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    debounceTimeout.current = setTimeout(async () => {
      try {
        console.log("USER INPUT: ", userInput);
        console.log("conversationHistory: ", conversationHistory);
        const headers = {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          Authorization: `Bearer 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`,
        };

        // Define keywords related to the conversation topic
        const keywords = [
          "artificial intelligence",
          "machine learning",
          "chat bot for pshicological counseling",
          "provide empathetic answers to prompts",
        ];

        // Combine the keywords with the user input to provide more context
        const prompt = `${userInput}\n${keywords.join("\n")}`;

        const response = await axios.post(
          "http://localhost:3009/api/response",
          {
            conversationHistory,
            // userInput,
            prompt,
          },
          { headers }
        );

        handleChatbotResponse(response.data);
      } catch (error) {
        console.error(error);
      }
    }, 1000);
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
          bgcolor: "rgba(255, 255, 255, 0.12)",
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
          <Chip label="AImate" sx={{ backgroundColor: "#90caf9", color: "black", mr: 1 }} />
          {chatbotResponse && (
            <>
              <Divider orientation="vertical" sx={{ bgcolor: "#90caf9", height: "100%" }} />
              <Box sx={{ mx: 1, maxWidth: "80%" }}>
                <List sx={{ maxHeight: 200, overflow: "auto" }}>
                  <ListItem alignItems="flex-start" sx={{ py: 0, pl: 0, pr: 1 }}>
                    <ListItemText primary="Chatbot response:" primaryTypographyProps={{ color: "#90caf9" }} />
                    <ListItemText primary={chatbotResponse} primaryTypographyProps={{ color: "#90caf9" }} />
                  </ListItem>
                </List>
              </Box>
            </>
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
                <IconButton type="submit" edge="end" sx={{ color: "#90caf9" }}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Card>
    </Box>
  );
};

// return (
//   return (
//     <Box sx={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           padding: 2,
//           marginTop: 10,
//           width: "60%",
//           backgroundColor: "rgba(255, 255, 255, 0.12)",
//         }}
//       >
//         <Box sx={{ marginBottom: 3 }}>
//           <Divider>
//             <Chip label="AImate" sx={{ backgroundColor: "#90caf9", color: "black" }} />
//           </Divider>
//           <TextField
//             fullWidth
//             multiline
//             rows={10}
//             margin="normal"
//             variant="outlined"
//             label="Conversation history"
//             value={conversationHistory}
//             InputProps={{ readOnly: true }}
//           />
//           {chatbotResponse && (
//             <div>
//               <Typography variant="h5" gutterBottom>
//                 Chatbot response:
//               </Typography>
//               <Typography variant="body1" sx={{ color: "#90caf9" }}>
//                 {chatbotResponse}
//               </Typography>
//             </div>
//           )}
//         </Box>

//         <Box component="form" onSubmit={handleSubmit}>
//           <OutlinedInput
//             sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
//             fullWidth
//             placeholder="write here"
//             size="small"
//             value={userInput}
//             onChange={handleUserInput}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton type="submit" edge="end">
//                   <SendIcon sx={{ color: "#90caf9", marginLeft: 1 }} />
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </Box>
//       </Card>
//     </Box>
//   );
//     <Box sx={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: "column",

//           padding: 2,
//           marginTop: 10,
//           width: "60%",
//           backgroundColor: "rgba(255, 255, 255, 0.12)",
//         }}
//       >
//         <Box sx={{ marginBottom: 3 }}>
//           <Divider>
//             <Chip label="AImate" sx={{ backgroundColor: "#90caf9", color: "black" }} />
//           </Divider>
//           {conversationHistory.split("\n").map((line, index) => (
//             <TextField
//               fullWidth
//               multiline
//               rows={10}
//               margin="normal"
//               variant="outlined"
//               label="Conversation history"
//               value={conversationHistory}
//               InputProps={{ readOnly: true }}
//             />
//           ))}
//           {chatbotResponse && (
//             <div>
//               <Typography variant="h5" gutterBottom>
//                 Chatbot response:
//               </Typography>
//               <Typography variant="body1">{chatbotResponse}</Typography>
//             </div>
//           )}
//         </Box>

//         <Box component="form" onSubmit={handleSubmit}>
//           <OutlinedInput
//             sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
//             fullWidth
//             placeholder="write here"
//             size="small"
//             value={userInput}
//             onChange={handleUserInput}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton type="submit" edge="end">
//                   <SendIcon sx={{ color: "#90caf9", marginLeft: 1 }} />
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </Box>
//       </Card>
//     </Box>
//);
// };

export default AImate;
