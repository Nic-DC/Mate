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
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { useSelector } from "react-redux";
import Profile from "./Profile";

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
  const passedSocket = socket;
  console.log("NAVBAR SOCKET: ", passedSocket);
  const navigate = useNavigate();
  // const isRegistered = useSelector((store) => store.authentication.isRegistered);
  const isRegistered = useSelector((store) => store.main.authentication.isRegistered);
  console.log("IS THE USER REGISTERED: ", isRegistered);
  // const isLogged = useSelector((store) => store.authentication.isLogged);
  const isLogged = useSelector((store) => store.main.authentication.isLogged);
  console.log("IS THE USER LOGGED: ", isLogged);

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
        <Box>
          <Logo />
        </Box>
        {(isRegistered || isLogged) && (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => navigate("/home")}>
                  <CottageIcon />
                </Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Tooltip title="My chat">
                  <Button>
                    <ChatIcon onClick={() => navigate("/chat")} />
                  </Button>
                </Tooltip>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Tooltip title="My journal">
                  <Button onClick={() => navigate(`/journal`)}>
                    <CreateIcon />
                  </Button>
                </Tooltip>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Tooltip title="My Mate">
                  <Button onClick={() => navigate(`/aimate`)}>
                    <Diversity2Icon />
                  </Button>
                </Tooltip>
              </Stack>
            </Box>

            <Profile />

            {/* <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <ImageAvatar direction="row" />
              <Login handleCloseLogin={handleCloseLogin} handleOpenLogin={handleOpenLogin} openLogin={openLogin} />
            </Box> */}
          </>
        )}
      </Box>
    </AppBar>
  );
};
export default Navbar;
