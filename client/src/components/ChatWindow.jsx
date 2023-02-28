import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = () => {
  const [socket, setSocket] = useState(null); // socket
  const [message, setMessage] = useState(""); // input message
  const [chat, setChat] = useState([]); // all inputted messages
  const [isTyping, setIsTyping] = useState(false);

  console.log("The chat: ", chat);

  // when loading the app
  useEffect(() => {
    setSocket(io("http://localhost:3009", { transports: ["websocket"] }));
  }, []);

  // when the socket changes
  useEffect(() => {
    if (!socket) return;

    socket.on("typing-started-server", () => {
      console.log("typing...");
      setIsTyping(true);
    });
    socket.on("typing-stopped-server", () => {
      console.log("stoppeedddd...");
      setIsTyping(false);
    });

    socket.on("message-server", (message) => {
      console.log("FE - the message-server: ", message);
      // we save the message and received property that we receive from the server
      setChat((prev) => [...prev, { message: message.message, received: true }]);
    });
  }, [socket]);

  // handleInput function
  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-started-client");

    setTimeout(() => {
      socket.emit("typing-stopped-client");
    }, 600);
  };

  // when we send the message
  const handleSubmit = (e) => {
    e.preventDefault();

    /* --- sending the message ---*/
    // we emit the form input
    socket.emit("message-client", { message });
    // save the message & received property that we emit
    setChat((prev) => [...prev, { message, received: false }]);

    /* --- emit to the server that we are typing a message ---*/

    // we clear the form input
    setMessage("");
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ padding: 2, marginTop: 10, width: "60%", backgroundColor: "lightgray" }}>
        <Box sx={{ marginBottom: 5 }}>
          {isTyping && (
            <InputLabel shrink htmlFor="message-input">
              Typing...
            </InputLabel>
          )}

          {chat.map((data, index) => (
            <Typography key={index} sx={{ textAlign: data.received ? "left" : "right" }}>
              {data.message}
            </Typography>
          ))}
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <OutlinedInput
            id="message-input"
            sx={{ backgroundColor: "white" }}
            fullWidth
            placeholder="write here"
            size="small"
            value={message}
            onChange={handleInput}
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
