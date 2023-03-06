import Card from "@mui/material/Card";
import { Button, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import ChatRoom from "./pages/ChatRoom";

const ChatNewRoom = ({ socket }) => {
  /* ------------------------------------------------------
  --------------------- from Navbar ----------------------
  ------------------------------------------------------ */
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  const passedSocket = socket;
  console.log("NAVBAR SOCKET: ", passedSocket);
  // create new room
  const createRoom = () => {
    console.log("Room created");
    // // const roomId = uuidv4();
    // const roomId = uuidv4();
    // navigate(`/rooms/${roomId}`);
    // // emit an event when creating a new room
    // passedSocket.emit("new-room-created", { roomId });
    // console.log("EMITING NEW ROOM NAVBAR: ", roomId);
    // setRooms([...rooms, roomId]);
  };

  // fetch the rooms
  const baseEndpoint = process.env.BE_URL;
  console.log("baseendpoint: ", baseEndpoint);
  const fetchRooms = async () => {
    try {
      const endpoint = `http://localhost:3009/rooms`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to register user");
      }

      const rooms = await response.json();
      console.log("the fetched rooms are: ", rooms);
      setRooms(rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!passedSocket) return;

    passedSocket.on("new-room-created", ({ roomId }) => {
      console.log(`RECEIVING NEW ROOM - on window load - ${roomId}`);
      setRooms([...rooms, roomId]);
    });
  }, [passedSocket, rooms]);
  return (
    <>
      <h1>New Room</h1>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",

          padding: 2,
          marginTop: 10,
          width: "35%",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <Box sx={{ marginBottom: 5 }}>
          <Tooltip title="Go to room">
            <Button onClick={createRoom}>
              <CommentIcon sx={{ color: "#90caf9" }} />
            </Button>
          </Tooltip>
          {/* <Divider> */}
          <Chip label="Rooms:" sx={{ alignSelf: "center" }} />
          {/* </Divider> */}
          {/* <ChatRoom /> */}
        </Box>
      </Card>
    </>
  );
};

export default ChatNewRoom;
