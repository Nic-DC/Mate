import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CottageIcon from "@mui/icons-material/Cottage";
import ImageAvatar from "./ImageAvatar";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { orange } from "@mui/material/colors";
import WeekendIcon from "@mui/icons-material/Weekend";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: orange[500],
    },
  },
});
const StyledButton = styled(Button)({
  margin: theme.spacing(1),
});

const Navbar = ({ socket }) => {
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  const passedSocket = socket;
  console.log("NAVBAR SOCKET: ", passedSocket);

  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  // create new room
  const createRoom = () => {
    // const roomId = uuidv4();
    const roomId = uuidv4();
    navigate(`/rooms/${roomId}`);
    // emit an event when creating a new room
    passedSocket.emit("new-room-created", { roomId });
    console.log("EMITING NEW ROOM NAVBAR: ", roomId);
    setRooms([...rooms, roomId]);
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
    <AppBar position="static" color="secondary">
      {/* <Toolbar> */}
      {/* <IconButton size="large" edge="start" color="inherit" aria-label="logo"></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AImate
        </Typography> */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Box>
            <Logo />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate("/home")}>
              <CottageIcon />
            </Button>
          </Stack>
          {rooms.map((room) => (
            <Stack direction="row" spacing={2} key={room._id}>
              <Button onClick={() => navigate(`rooms/${room.roomId}`)}>Room {room.roomId.slice(-2)}</Button>
            </Stack>
          ))}

          <Stack direction="row" spacing={2}>
            <Tooltip title="New journal entry">
              <Button onClick={() => navigate(`/journal`)}>
                <CreateIcon />
              </Button>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Tooltip title="New room">
              <Button onClick={createRoom}>
                <ChatIcon />
              </Button>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Ai counselor">
              <Button>
                <Diversity2Icon />
              </Button>
            </Tooltip>
            <Stack direction="row" spacing={2}>
              <Tooltip title="Chat page">
                <Button>
                  <WeekendIcon onClick={() => navigate("/chatPage")} />
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <ImageAvatar direction="row" />
          <Login handleCloseLogin={handleCloseLogin} handleOpenLogin={handleOpenLogin} openLogin={openLogin} />
        </Box>
      </Box>
    </AppBar>
  );
};
export default Navbar;
