import { Avatar, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsRegisteredAction } from "../redux/actions";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import SettingsIcon from "@mui/icons-material/Settings";
import { deepOrange } from "@mui/material/colors";

const Profile = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    navigate("/");
    dispatch(setIsRegisteredAction(false));
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
          {/* <Avatar alt="Remy Sharp" src="/user.png" /> */}
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu} sx={{ marginBottom: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonPinIcon sx={{ color: "#90caf9" }} />
            <Typography sx={{ color: "#90caf9" }}>Account</Typography>
          </Stack>
        </MenuItem>

        <MenuItem onClick={handleCloseUserMenu} sx={{ marginBottom: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SettingsIcon sx={{ color: "#90caf9" }} />
            <Typography sx={{ color: "#90caf9" }}>Settings</Typography>
          </Stack>
        </MenuItem>

        <MenuItem onClick={handleLogOut}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LogoutIcon sx={{ color: "#90caf9" }} />
            <Typography sx={{ color: "#90caf9" }}>Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default Profile;
