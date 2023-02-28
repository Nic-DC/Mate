import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import ChatWindow from "./components/ChatWindow";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChatRoom from "./components/pages/ChatRoom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Container>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Routes>
                <Route path="/chat" element={<ChatWindow />} />
                <Route path="/home" element={<Home />} />
                <Route path="/rooms/:chatId" element={<ChatRoom />} />
              </Routes>
            </Box>
          </Container>
        </div>
      </Router>{" "}
    </ThemeProvider>
  );
}

export default App;
