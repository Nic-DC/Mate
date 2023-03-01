import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import CottageIcon from "@mui/icons-material/Cottage";

import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ImageAvatar from "./ImageAvatar";

const Navbar = () => {
  const navigate = useNavigate();

  // create new room
  const createRoom = () => {
    const roomId = uuidv4();
    navigate(`/rooms/${roomId}`);
  };

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
