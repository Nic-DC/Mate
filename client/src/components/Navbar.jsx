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
import BugReportIcon from "@mui/icons-material/BugReport";

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

const Navbar = () => {
  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <AppBar position="static" color="secondary">
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

          <Stack direction="row" spacing={2}>
            <Tooltip title="New journal entry">
              <Button onClick={() => navigate(`/journal`)}>
                <CreateIcon />
              </Button>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Tooltip title="New room">
              <Button onClick={() => console.log("Navbar - New room clicked")}>
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
            <Stack direction="row" spacing={2}>
              <Tooltip title="Chat page">
                <Button>
                  <BugReportIcon onClick={() => navigate("/")} />
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
