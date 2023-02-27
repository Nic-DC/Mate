import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function App() {
  const [socket, setSocket] = useState(null); // socket
  const [message, setMessage] = useState("");
  useEffect(() => {
    setSocket(io("http://localhost:3009", { transports: ["websocket"] }));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("server-message", (serverMessage) => {
      console.log(serverMessage);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("client-message", { message });
    setMessage("");
  };
  return (
    <div className="App">
      <h1>Hello Socket</h1>
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
    </div>
  );
}

export default App;
