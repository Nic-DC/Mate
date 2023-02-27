import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

function App() {
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
    <div className="App">
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message) => (
            <Typography>{message}</Typography>
          ))}
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="...write your message"
            variant="standard"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
