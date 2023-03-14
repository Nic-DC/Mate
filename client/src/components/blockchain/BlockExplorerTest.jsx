import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import dayjs from "dayjs";

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "100%",
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.6)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const BlockExplorerTest = () => {
  const [blocks, setBlocks] = useState([]);

  const timestamp = 1678787443821; // Replace this with your actual timestamp
  const formattedTimestamp = dayjs(timestamp).format("MMM D, YYYY h:mm A");
  console.log("FORMAT TIME:", formattedTimestamp);

  const getBlocks = async () => {
    try {
      const response = await fetch("http://localhost:3009/blocks");
      const data = await response.json();
      setBlocks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlocks();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ margin: theme.spacing(2) }}>
        <Typography variant="h4" style={{ color: "#90caf9" }}>
          Block Explorer
        </Typography>
        <List style={{ backgroundColor: theme.palette.background.default, marginBottom: theme.spacing(2) }}>
          {blocks.map((block, index) => (
            <ListItem key={block.hash}>
              <ListItemText
                primary={`Block ${index} hash: ${block.hash}`}
                secondary={`Timestamp: ${dayjs(block.timestamp).format("MMM D, YYYY h:mm A")}`}
                primaryTypographyProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
                secondaryTypographyProps={{ style: { color: "rgba(255, 255, 255, 0.6)" } }}
              />
            </ListItem>
          ))}
        </List>
        <StyledTextField label="Enter block index" variant="outlined" />
        <StyledButton variant="contained" color="primary">
          Find block
        </StyledButton>
      </div>
    </ThemeProvider>
  );
};

export default BlockExplorerTest;
