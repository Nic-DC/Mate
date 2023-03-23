import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

const Background = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundImage: `url(AIbackgroundBlockchain.png)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(255, 255, 255, 0.6)",
    },
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.6)",
    },
    "& input": {
      color: "rgba(255, 255, 255, 0.6)",
    },
  },
  "& label.MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
  },
});

function JournalEntries() {
  const [entries, setEntries] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(`http://localhost:3009/blockchain?title=${titleFilter}&topic=${topicFilter}`);
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntries();
  }, [titleFilter, topicFilter]);

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
  };

  const handleTopicFilterChange = (event) => {
    setTopicFilter(event.target.value);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgba(255, 255, 255, 0.6)",
      },
      background: {
        default: "#1E1E1E",
      },
    },
    typography: {
      fontFamily: "sans-serif",
    },
  });

  const EntryWrapper = styled(ListItem)({
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgba(255, 255, 255, 0.6)",
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:last-child": {
      borderBottom: "none",
    },
  });

  const EntryTitle = styled(Typography)({
    fontWeight: "bold",
    fontSize: "1.2rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: "10px",
    maxWidth: "50%",
    color: "#90caf9",
  });

  const EntryTimestamp = styled(Typography)({
    fontWeight: "bold",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 0,
  });

  const EntryContent = styled(Typography)({
    fontSize: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "50%",
  });

  const EntryDetails = styled("div")({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginRight: "10px",
    overflow: "hidden",
  });

  const EntryValidity = styled(Typography)({
    fontWeight: "bold",
    fontSize: "0.9rem",

    color: `${({ color }) => color}`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 0,
  });

  return (
    <Background>
      <ThemeProvider theme={theme}>
        <div style={{ width: "50%" }}>
          <StyledTextField
            label="Filter by title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
            InputProps={{
              style: {
                color: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
            }}
            fullWidth
            sx={{ marginTop: "3rem", marginBottom: 2 }}
          />
          <StyledTextField
            label="Filter by topic"
            value={topicFilter}
            onChange={handleTopicFilterChange}
            InputProps={{
              style: {
                color: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
            }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <List style={{ height: "300px", overflowY: "scroll", overflowX: "hidden" }}>
            {entries.slice(0, 10).map((entry) => (
              <EntryWrapper key={entry._id}>
                <EntryDetails>
                  <EntryTitle>{entry.title}</EntryTitle>
                  <EntryContent>{entry.content}</EntryContent>
                </EntryDetails>

                <div>
                  <EntryTimestamp>{dayjs(entry.createdAt).format("YYYY-MM-DD HH:mm")}</EntryTimestamp>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* <EntryValidity valid={entry.valid} color={entry.valid ? "green" : "red"}>
                    {entry.valid ? "Valid" : "Invalid"}
                  </EntryValidity> */}
                    {/* <EntryValidity valid={!entry.tampered} color={!entry.tampered ? "green" : "red"}>
                    {!entry.tampered ? "Valid" : "Invalid"}
                  </EntryValidity> */}
                    <EntryValidity
                      valid={entry.blockHash !== "Not found"}
                      color={entry.blockHash !== "Not found" ? "green" : "red"}
                    >
                      {entry.blockHash !== "Not found" ? "Your entry" : "Tampered"}
                    </EntryValidity>

                    <Tooltip title={`Block Hash: ${entry.blockHash}`}>
                      <IconButton>
                        <ViewInArIcon style={{ color: "#90caf9" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </EntryWrapper>
            ))}
          </List>
        </div>
      </ThemeProvider>
    </Background>
  );
}

export default JournalEntries;
