import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";

import { Container } from "@mui/system";
import { Typography } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = () => {
  const [socket, setSocket] = useState(null); // socket
  const [message, setMessage] = useState(""); // input message
  const [chat, setChat] = useState([]); // all inputted messages

  console.log("The chat: ", chat);

  // when loading the app
  useEffect(() => {
    setSocket(io("http://localhost:3009", { transports: ["websocket"] }));
  }, []);

  // when the socket changes
  useEffect(() => {
    if (!socket) return;

    socket.on("server-message", (serverMessage) => {
      console.log("FE - the server-message: ", serverMessage);
      setChat((prev) => [...prev, serverMessage.editedMessage]);
    });
  }, [socket]);

  // when we send the message
  const handleSubmit = (e) => {
    e.preventDefault();

    // we emit the form input
    socket.emit("client-message", { message });

    // we clear the form input
    setMessage("");
  };
  return (
    <>
      <Box sx={{ marginBottom: 5 }}>
        {chat.map((message) => (
          <Typography>{message}</Typography>
        ))}
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <OutlinedInput
          placeholder="write here"
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </>
  );
};

export default ChatWindow;
