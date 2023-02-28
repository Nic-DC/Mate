import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
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

    socket.on("server-message", (message) => {
      console.log("FE - the server-message: ", message);
      setChat((prev) => [...prev, { message: message.message, received: true }]);
    });
  }, [socket]);

  // when we send the message
  const handleSubmit = (e) => {
    e.preventDefault();

    // we emit the form input
    socket.emit("client-message", { message });
    setChat((prev) => [...prev, { message, received: false }]);

    // we clear the form input
    setMessage("");
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ padding: 2, marginTop: 10, width: "60%", backgroundColor: "lightgray" }}>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data) => (
            <Typography sx={{ textAlign: data.received ? "right" : "left" }}>{data.message}</Typography>
          ))}
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <OutlinedInput
            sx={{ backgroundColor: "white" }}
            fullWidth
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
      </Card>
    </Box>
  );
};

export default ChatWindow;
