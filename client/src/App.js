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
import Journal from "./components/pages/Journal";
import ChatPage from "./components/chat/ChatPage";
import ChatsLeft from "./components/ChatsRight";
import AImate from "./components/ai/AImate";
import BlockExplorer from "./components/blockchain/BlockExplorer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [socket, setSocket] = useState(null); // socket

  const [message, setMessage] = useState("");

  // cont variable used to monitor the creation and deletion of rooms
  const [countRooms, setCountRooms] = useState(0);

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
                {/* <Route path="/chat" element={<ChatRoom socket={socket} />} /> */}
                <Route path="/home" element={<Home socket={socket} />} />
                <Route
                  path="/rooms/:roomId"
                  element={
                    <ChatRoom
                      socket={socket}
                      countRooms={countRooms}
                      setCountRooms={setCountRooms}
                      setMessage={setMessage}
                    />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/chatPage" element={<ChatPage />} />
                <Route path="/chats" element={<ChatsLeft />} />
                <Route
                  path="/chat"
                  element={
                    <ChatWindow
                      socket={socket}
                      countRooms={countRooms}
                      setCountRooms={setCountRooms}
                      message={message}
                      setMessage={setMessage}
                    />
                  }
                />
                <Route path="/blocks" element={<BlockExplorer />} />
                <Route path="/aimate" element={<AImate />} />
              </Routes>
            </Box>
          </Container>
        </div>
      </Router>{" "}
    </ThemeProvider>
  );
}

export default App;
