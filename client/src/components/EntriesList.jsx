import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import CreateIcon from "@mui/icons-material/Create";

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     })
//   );
// }

const theme = createTheme({
  palette: {
    background: {
      default: "rgba(0, 0, 0, 1)",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const EntriesList = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 1,
              width: "92.5%",
            }}
          >
            <Demo>
              <List sx={{ color: "white" }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CreateIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondaryTypographyProps={{ color: "rgba(255, 255, 255, 0.6)" }}
                    secondary="Secondary text"
                  />
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
                  </IconButton>
                </ListItem>
              </List>
            </Demo>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default EntriesList;
