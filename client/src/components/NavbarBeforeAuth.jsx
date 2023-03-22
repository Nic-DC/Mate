import { AppBar, Box } from "@mui/material";

import Logo from "./Logo";

import { createTheme } from "@mui/material/styles";

import { orange } from "@mui/material/colors";

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

const NavbarBeforeAuth = ({ isAuthenticated }) => {
  return (
    <AppBar position="static" color="secondary">
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Logo />
        </Box>
      </Box>
    </AppBar>
  );
};
export default NavbarBeforeAuth;
