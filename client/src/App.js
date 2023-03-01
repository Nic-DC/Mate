import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import ChatWindow from "./components/ChatWindow";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChatRoom from "./components/pages/ChatRoom";
import Login from "./components/pages/Login";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [socket, setSocket] = useState(null); // socket
  // when loading the app
  useEffect(() => {
    setSocket(io("http://localhost:3009", { transports: ["websocket"] }));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar socket={socket} />
          <Container>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Routes>
                <Route path="/chat" element={<ChatWindow socket={socket} />} />
                <Route path="/home" element={<Home socket={socket} />} />
                <Route path="/rooms/:roomId" element={<ChatRoom socket={socket} />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
          </Container>
        </div>
      </Router>{" "}
    </ThemeProvider>
  );
}

export default App;
