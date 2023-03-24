import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilteredJournalsAction } from "../redux/actions";
import EntriesList from "./EntriesList";

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
const StyledTextField = styled(TextField)({
  margin: theme.spacing(0),
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
});

const Search = ({ count, setCount }) => {
  /* ------ SEARCH: JOURNAL ENTRIES ------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");

  const serverUrl = process.env.REACT_APP_BE_URL;

  console.log("SEARCH TERM - search: ", searchTerm);
  console.log("FILTERED JOURNALS - search: ", filteredJournals);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchSubmitted(false);
  };

  const dispatch = useDispatch();

  /* ------ SEARCH: JOURNAL ENTRIES ------- */
  const fetchFilteredJournals = async () => {
    // const endpoint = `http://localhost:3009/journals/filtered?topic=${searchTerm}`;
    const endpoint = `${serverUrl}/journals/filtered?topic=${searchTerm}`;

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Network response not ok. Problem fetching the filterd journals`);
      }

      const fetchedFilteredJournals = await response.json();

      dispatch(getFilteredJournalsAction(fetchedFilteredJournals));

      setFilteredJournals(fetchedFilteredJournals);
      setSubmittedSearchTerm(searchTerm);
      setSearchSubmitted(true);

      // setCountFetches(countFetches + 1);
      setSearchTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Search term: ${searchTerm}`);
    fetchFilteredJournals();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 2,
            paddingLeft: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <StyledTextField
                placeholder=" Search by topic"
                variant="outlined"
                name="searchTerm"
                value={searchTerm}
                onChange={handleChange}
                InputProps={{ startAdornment: <SearchIcon color="primary" /> }}
              />
            </Box>
          </form>
        </Box>
        <EntriesList
          count={count}
          setCount={setCount}
          filteredJournals={filteredJournals}
          setFilteredJournals={setFilteredJournals}
          submittedSearchTerm={submittedSearchTerm}
          searchSubmitted={searchSubmitted}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Search;
