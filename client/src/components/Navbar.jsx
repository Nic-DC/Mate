import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CottageIcon from "@mui/icons-material/Cottage";

import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ImageAvatar from "./ImageAvatar";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  const passedSocket = socket;
  console.log("NAVBAR SOCKET: ", passedSocket);

  // create new room
  const createRoom = () => {
    // const roomId = uuidv4();
    const roomId = uuidv4();
    navigate(`/rooms/${roomId}`);
    // emit an event when creating a new room
    passedSocket.emit("new-room-created", { roomId });
    console.log("EMITING NEW ROOM NAVBAR: ", roomId);
  };

  useEffect(() => {
    if (!passedSocket) return;

    passedSocket.on("new-room-created", ({ roomId }) => {
      console.log(`RECEIVING NEW ROOM - on window load - ${roomId}`);
      setRooms([...rooms, roomId]);
    });
  }, [passedSocket]);

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box> */}
        <IconButton size="large" edge="start" color="inherit" aria-label="logo"></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AImate
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate("/home")}>
            <CottageIcon />
          </Button>
        </Stack>
        {/* </Box>

          <Box> */}
        <Stack direction="row" spacing={2}>
          <Button>
            <ImageAvatar />
          </Button>
        </Stack>
        {/* <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate("/room/:roomId")}>Room</Button>
        </Stack> */}
        {rooms.map((room) => (
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate(`rooms/${room}`)}>Room {room.slice(-2)}</Button>
          </Stack>
        ))}
        <Stack direction="row" spacing={2}>
          <Tooltip title="New journal entry">
            <Button>
              <Fab color="primary" aria-label="add">
                <CreateIcon />
              </Fab>
            </Button>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Tooltip title="New room">
            <Button onClick={createRoom}>
              <Fab color="primary" aria-label="add">
                <ChatIcon />
              </Fab>
            </Button>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Ai counselor">
            <Button>
              <Fab color="primary" aria-label="add">
                <Diversity2Icon />
              </Fab>
            </Button>
          </Tooltip>
        </Stack>
        {/* </Box>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
