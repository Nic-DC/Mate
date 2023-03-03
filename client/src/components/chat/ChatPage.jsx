import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

import Card from "@mui/material/Card";

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
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "rgba(0, 0, 0, 1)",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(1),
  width: "100%",
});

const StyledTextField = styled(TextField)({
  margin: theme.spacing(1),
  width: "100%",
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.6)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
  },
});

const StyledButton = styled(Button)({
  margin: theme.spacing(2),
});

const ChatPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTED");
  };

  return (
    <>
      <h1>ChatPage</h1>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            ...theme.palette.primary,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgba(0, 0, 0, 1)",
            p: 2,
            m: 6,
            width: "60%",
          }}
        >
          <Box sx={{ width: "65%" }}>
            {/* <Card sx={{ padding: 2, marginTop: 10, width: "60%", backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
              <Box sx={{ marginBottom: 5 }}> */}
            {/* {params.roomId && (
          <Divider sx={{ marginBottom: 1.5 }}>
            <Chip label={`Room: ${params.roomId}`} />
          </Divider>
        )} */}

            <Tooltip title="Go to room">
              <Button onClick={() => navigate(`/rooms/${params.roomId}`)}>
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

            <Divider>
              <Chip label="AImate" />
            </Divider>

            {/* {isTyping && (
          <InputLabel shrink htmlFor="message-input">
            Someone typing...
          </InputLabel>
        )} */}

            {/* {chat.map((data, index) => (
          <>
            <Typography key={index} sx={{ textAlign: data.received ? "left" : "right", color: "#90caf9" }}>
              {data.message}
            </Typography>
          </>
        ))} */}
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <OutlinedInput
              id="message-input"
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)", color: "white" }}
              fullWidth
              placeholder="write here"
              size="small"
              //   value={message}
              //   onChange={handleInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end">
                    <SendIcon sx={{ color: "#90caf9" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
            {/* </Box>
            </Card> */}
          </Box>
          <Box sx={{ width: "40%", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>Write here</Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default ChatPage;
