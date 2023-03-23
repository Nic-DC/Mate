import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Entry from "./Entry";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedJournalAction } from "../redux/actions";

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
  maxHeight: "calc(1.75rem * 4 + 48px * 4)",
  overflowY: "auto",
}));

const EntriesList = ({ filteredJournals, count, setCount, submittedSearchTerm, searchSubmitted }) => {
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "flex-start",
            // marginTop: 2,
            // marginBottom: 2,
            m: 2,
          }}
        >
          <Box
          // sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-between",
          //   border: "1px solid rgba(255, 255, 255, 0.12)",
          //   borderRadius: 1,
          //   width: "92.5%",
          // }}
          >
            <Demo>
              <List sx={{ color: "white", padding: 0 }}>
                {filteredJournals && filteredJournals.length > 0 ? (
                  filteredJournals.map((journal) => (
                    <ListItem
                      key={journal._id}
                      sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}
                      onClick={() => dispatch(setSelectedJournalAction(journal))}
                    >
                      <Entry
                        title={journal.title}
                        topic={journal.topic}
                        content={journal.content}
                        count={count}
                        setCount={setCount}
                      />
                    </ListItem>
                  ))
                ) : submittedSearchTerm && searchSubmitted ? (
                  <ListItem sx={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)" }}>No journals match</ListItem>
                ) : null}
              </List>
            </Demo>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default EntriesList;
