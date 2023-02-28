import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";

import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import CommentIcon from "@mui/icons-material/Comment";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const ChatWindow = () => {
  const [socket, setSocket] = useState(null); // socket
  const [message, setMessage] = useState(""); // input message
  const [chat, setChat] = useState([]); // all inputted messages
  const [isTyping, setIsTyping] = useState(false); // for the "typing" render
  const [typingTimeout, setTypingTimeout] = useState(null); // for the debounce effect - "typing" render

  const navigate = useNavigate();

  const roomId = uuidv4();

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

    /* --- emit to the server that we are typing a message ---*/
    socket.emit("typing-started-client");
    // debounce effect
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped-client");
        console.log("stopped..............!!!!!");
      }, 1000)
    );
  };

  // when we send the message
  const handleSubmit = (e) => {
    e.preventDefault();

    /* --- sending the message ---*/
    // we emit the form input
    socket.emit("message-client", { message });
    // save the message & received property that we emit
    setChat((prev) => [...prev, { message, received: false }]);

    // we clear the form input
    setMessage("");
  };
  return (
    // <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Card sx={{ padding: 2, marginTop: 10, width: "60%", backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
      <Box sx={{ marginBottom: 5 }}>
        <Tooltip title="Go to room">
          <Button onClick={() => navigate(`/rooms/${roomId}`)}>
            <CommentIcon sx={{ color: "#90caf9" }} />
          </Button>
        </Tooltip>

        <Tooltip title="Save chat">
          <Button onClick={() => console.log("Messages saved")}>
            <SaveIcon sx={{ color: "#90caf9" }} />
          </Button>
        </Tooltip>

        <Tooltip title="Delete messages">
          <Button onClick={() => console.log("Messages deleted")}>
            <ClearIcon sx={{ color: "#90caf9" }} />
          </Button>
        </Tooltip>

        {/* <Divider /> */}
        <Divider>
          <Chip label="AImate" />
        </Divider>

        {isTyping && (
          <InputLabel shrink htmlFor="message-input">
            Someone typing...
          </InputLabel>
        )}

        {chat.map((data, index) => (
          <>
            <Typography key={index} sx={{ textAlign: data.received ? "left" : "right", color: "#90caf9" }}>
              {data.message}
            </Typography>
          </>
        ))}
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <OutlinedInput
          id="message-input"
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
          fullWidth
          placeholder="write here"
          size="small"
          value={message}
          onChange={handleInput}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SendIcon sx={{ color: "#90caf9" }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Card>
    // </Box>
  );
};

export default ChatWindow;
