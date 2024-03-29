import React from "react";
import { styled } from "@mui/material/styles";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { orange } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import HomeCard from "../HomeCard";
// import { TextareaAutosize } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
    },
  },
});

const Background = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  // backgroundImage: `url(https://picsum.photos/id/237/1920/1080)`,
  backgroundImage: `url(AIbackgroundHome.png)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
});

const ButtonContainer = styled("div")({
  display: "flex",
  // flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Home = ({ socket, setIsAuthenticated }) => {
  const passedSocket = socket;
  console.log("HOME SOCKET: ", passedSocket);

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Box sx={{ borderRadius: 3, backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
          <ButtonContainer>
            {/* <StyledButton sx={{ backgroundColor: orange[900] }}>New user</StyledButton>
            <StyledButton>I'm home</StyledButton> */}
            <HomeCard
              handleCloseRegister={handleCloseRegister}
              handleOpenRegister={handleOpenRegister}
              openRegister={openRegister}
              handleCloseLogin={handleCloseLogin}
              handleOpenLogin={handleOpenLogin}
              openLogin={openLogin}
              setIsAuthenticated={setIsAuthenticated}
            />
            {/* <Register
              handleCloseRegister={handleCloseRegister}
              handleOpenRegister={handleOpenRegister}
              openRegister={openRegister}
            />
            <Login handleCloseLogin={handleCloseLogin} handleOpenLogin={handleOpenLogin} openLogin={openLogin} /> */}
          </ButtonContainer>
        </Box>
      </Background>
    </ThemeProvider>
  );
};

export default Home;
