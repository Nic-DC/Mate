import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Search from "../Search";
import EntriesBadge from "../EntriesBadge";
import EntriesList from "../EntriesList";

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

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(1),
  width: "100%",
});

const StyledTextField = styled(TextField)({
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
});

const StyledButton = styled(Button)({
  margin: theme.spacing(2),
});

const Journal = () => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    // date: "",
    content: "",
  });

  /* ------ BADGE: JOURNAL ENTRIES ------- */
  const [count, setCount] = useState(0);
  const [fetchedJournals, setFetchedJournals] = useState([]);

  /* ------ JOURNAL: SUBMIT ------- */
  //const [isCreated, setIsCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("COUNT in JOURNAL: ", count);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  /* ------ BADGE: JOURNAL ENTRIES ------- */
  const fetchJournalEntries = async () => {
    const endpoint = `http://localhost:3009/journals`;
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Network response not ok. Failed to fetch users`);
      }

      const journals = await response.json();
      setFetchedJournals(journals);
    } catch (error) {
      console.log(error);
    }
  };

  /* ------ JOURNAL: SUBMIT ------- */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "http://localhost:3009/journals/entries";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        throw new Error(`Network response was not ok. Failed to post the journal entry`);
      }

      console.log("POST journal successfull!");

      setCount(count + 1);
      setFormData({
        title: "",
        topic: "",
        // date: "",
        content: "",
      });
      setSuccessMessage("Journal entry submitted successfully!");
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...theme.palette.primary,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(0, 0, 0, 1)",
          p: 2,
          m: 6,
          width: "60%",
        }}
      >
        <Box sx={{ width: "65%" }}>
          <FormContainer onSubmit={handleSubmit}>
            <StyledTextField
              label="Title"
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <StyledTextField
              label="Topic"
              variant="outlined"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            />
            {/* <StyledTextField
          label="Date"
          variant="outlined"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        /> */}
            <StyledTextField
              label="Content"
              variant="outlined"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <StyledButton type="submit" variant="contained" color="primary">
              Save journal
            </StyledButton>
            {successMessage && <div style={{ color: theme.palette.primary.main }}>{successMessage}</div>}
          </FormContainer>
        </Box>
        <Box sx={{ width: "40%", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {/* <Search
            fetchFilteredJournals={fetchFilteredJournals}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredJournals={filteredJournals}
          /> */}

          <EntriesBadge count={count} fetchedJournals={fetchedJournals} fetchJournalEntries={fetchJournalEntries} />

          <Search count={count} setCount={setCount} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Journal;
