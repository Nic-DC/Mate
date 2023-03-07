import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import { Button, List, Typography } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { v4 as uuidv4 } from "uuid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import CommentIcon from "@mui/icons-material/Comment";
import ChairIcon from "@mui/icons-material/Chair";
import SaveIcon from "@mui/icons-material/Save";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import ChatTest from "./ChatTest";
import ChatsRight from "./ChatsRight";
import { useRef } from "react";

const ChatWindow = ({ socket, countRooms, setCountRooms }) => {
  const [message, setMessage] = useState(""); // input message
  const [chat, setChat] = useState([]); // all inputted messages
  const [isTyping, setIsTyping] = useState(false); // for the "typing" render
  const [typingTimeout, setTypingTimeout] = useState(null); // for the debounce effect - "typing" render
  const [rooms, setRooms] = useState([]);

  const params = useParams();

  const passedSocket = socket;
  console.log("PARAMS - CHATWINDOW: ", params.roomId);

  const navigate = useNavigate();

  const fileRef = useRef();

  // when the socket changes
  useEffect(() => {
    if (!passedSocket) return;

    passedSocket.on("typing-started-server", () => {
      console.log("typing...");
      setIsTyping(true);
    });

    passedSocket.on("typing-stopped-server", () => {
      console.log("stoppeedddd...");
      setIsTyping(false);
    });

    passedSocket.on("message-server", (message) => {
      console.log("FE - the message-server: ", message);
      // we save the message and received property that we receive from the server
      setChat((prev) => [...prev, { message: message.message, received: true }]);
    });

    passedSocket.on("uploaded", (data) => {
      console.log("UPLOADED DATA: ", data);
      setChat((prev) => [...prev, { message: data.buffer, received: true, type: "image" }]);
    });

    // passedSocket.on("room-removed", ({ roomId }) => {
    //   setRooms(rooms.filter((room) => room.roomId !== roomId));
    // });
  }, [passedSocket]);

  const fetchRooms = async () => {
    try {
      const endpoint = `http://localhost:3009/rooms`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to get the available chat rooms");
      }

      const fetchedRooms = await response.json();
      setRooms(fetchedRooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  // handleInput function
  const handleInput = (e) => {
    setMessage(e.target.value);

    /* --- emit to the server that we are typing a message ---*/
    const roomId = params.roomId;
    passedSocket.emit("typing-started-client", { roomId });
    // debounce effect
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        passedSocket.emit("typing-stopped-client", { roomId });
        console.log("stopped..............!!!!!");
      }, 1000)
    );
  };

  // file sharing
  const selectFile = () => {
    fileRef.current.click();
  };

  const fileSelected = (e) => {
    const roomId = params.roomId;

    console.log("THE SELECTED FILE: ", e.target.files);
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const data = reader.result;
      socket.emit("upload", { data, roomId });
      setChat((prev) => [...prev, { message: reader.result, received: false, type: "image" }]);
    };
  };

  // CREATE NEW ROOM
  const createRoom = () => {
    console.log("Room created");

    // increase the countRooms variable by 1
    setCountRooms(countRooms + 1);

    const roomId = uuidv4();
    navigate(`/rooms/${roomId}`);
    setMessage("");

    // emit an event when creating a new room
    passedSocket.emit("new-room-created", { roomId });
    console.log("EMITING NEW ROOM CHAT WINDOW: ", roomId);
    // setRooms([...rooms, roomId]);
  };

  // delete specific room
  const baseEndpoint = process.env.BE_URL;
  console.log("baseendpoint: ", baseEndpoint);

  const deleteRoom = async () => {
    const roomId = params.roomId;
    const options = {
      method: "DELETE",
    };
    try {
      const endpoint = `http://localhost:3009/rooms/${roomId}`;
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to delete chat room");
      }

      const deleteMessage = await response.json();

      console.log("DELETE chat room message: ", deleteMessage);

      if (deleteMessage) {
        // decrease the countRooms variable by 1
        setCountRooms(countRooms - 1);
      } else {
        console.log("DELETE jchat room DID NOT GO THROUGH");
      }
    } catch (error) {
      console.log(error);
    }
    // emit an event when creating a new room
    // passedSocket.emit("room-removed", { roomId });
    // console.log("DELETING ROOM CHAT WINDOW: ", roomId);
  };

  // when we send the message
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = params.roomId;

    /* --- sending the message ---*/
    // we emit the form input
    passedSocket.emit("message-client", { message, roomId });
    // save the message & received property that we emit
    setChat((prev) => [...prev, { message, received: false }]);

    // we clear the form input
    setMessage("");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",

          padding: 2,
          marginTop: 10,
          width: "60%",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <Box sx={{ marginBottom: 3, display: "flex", justifyContent: "flex-start" }}>
          {params.roomId && (
            <Divider>
              <Chip
                label={`${rooms.length > 0 ? `Room: ${params.roomId.slice(-4)}` : "No rooms"}`}
                sx={{ color: "#90caf9", backgroundColor: "rgba(255, 255, 255,0.1)", fontWeight: "bold" }}
              />
            </Divider>
          )}

          <ChatsRight countRooms={countRooms} socket={socket} />

          <Tooltip title="Create new room" placement="top">
            <Button onClick={createRoom}>
              {/* <CommentIcon sx={{ color: "#90caf9" }} /> */}
              <AddIcon />
              {/* <ChairIcon /> */}
            </Button>
          </Tooltip>

          <Tooltip title="Delete room" placement="top">
            <Button onClick={deleteRoom}>
              <ClearIcon sx={{ color: "#90caf9" }} />
            </Button>
          </Tooltip>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <Divider>
            <Chip
              // avatar={<MessageIcon sx={{ backgroundColor: "rgba(0, 0, 0,1)", color: "black" }} />}
              label="AImate"
              sx={{ backgroundColor: "#90caf9", color: "black" }}
            />
          </Divider>

          {isTyping && (
            <InputLabel shrink htmlFor="message-input">
              Someone typing...
            </InputLabel>
          )}

          {chat.map((data, index) => (
            <List sx={{ overflow: "auto", maxHeight: 400 }}>
              {data.type === "image" ? (
                <img src={data.message} alt="uploaded" width="100" />
              ) : (
                <Typography key={index} sx={{ textAlign: data.received ? "left" : "right", color: "#90caf9" }}>
                  {data.message}
                </Typography>
              )}
            </List>
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
                <input ref={fileRef} onChange={fileSelected} type="file" style={{ display: "none" }} />
                <IconButton type="button" edge="end" onClick={selectFile}>
                  <AttachFileIcon sx={{ color: "#90caf9" }} />
                </IconButton>
                <IconButton type="submit" edge="end">
                  <SendIcon sx={{ color: "#90caf9", marginLeft: 1 }} />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Card>
      {/* <ChatTest /> */}
    </Box>
  );
};

export default ChatWindow;
