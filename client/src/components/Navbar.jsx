import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo"></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AImate
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate("/home")}>Home</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate("/chat")}>Chat</Button>
        </Stack>
        {/* <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate("/room/:roomId")}>Room</Button>
        </Stack> */}
        <Stack direction="row" spacing={2}>
          <Button>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
