import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Search from "../Search";
import EntriesBadge from "../EntriesBadge";
import EntriesList from "../EntriesList";
import { theme, FormContainer, StyledTextField, StyledButton } from "../_styles/Journal";
import { useJournalForm, useJournalEntries } from "../_customHooks/Journal";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";

const Journal = () => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    content: "",
  });

  /* ------ BADGE: JOURNAL ENTRIES ------- */
  const [count, setCount] = useState(0);
  const [fetchedJournals, setFetchedJournals] = useState([]);

  /* ------ JOURNAL: SUBMIT ------- */

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("COUNT in JOURNAL: ", count);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  /* ------ ERROR HANDLING & LOADING ------- */
  const [loading, setLoading] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* ------ JOURNAL: SUBMIT ------- */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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
        content: "",
      });

      setSuccessMessage("Journal entry saved to the blockchain!");
      setErrorMessage("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred when saving the journal. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...theme.palette.primary,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderRadius: 3,
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

            <StyledTextField
              label="Content"
              variant="outlined"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={5}
            />
            <Tooltip title="Save journal" placement="bottom">
              <StyledButton type="submit" variant="contained" color="primary">
                <SaveIcon />
              </StyledButton>
            </Tooltip>
          </FormContainer>
        </Box>
        <Box sx={{ width: "40%", display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 2 }}>
          <EntriesBadge count={count} fetchedJournals={fetchedJournals} fetchJournalEntries={fetchJournalEntries} />

          <Search count={count} setCount={setCount} />
        </Box>
      </Box>
      <Box>
        {loading && <LinearProgress color="primary" />}

        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%", bgcolor: "#90caf9" }}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};
export default Journal;
