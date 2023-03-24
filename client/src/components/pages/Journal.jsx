import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
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

  backgroundImage: `url(AIbackgroundJournal.png)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
});
const Journal = () => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    content: "",
  });

  const navigate = useNavigate();
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
    <Background>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            ...theme.palette.primary,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            borderRadius: 3,
            p: 2,
            m: 2,
            marginTop: 9,
            width: "50%",
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
                rows={12}
              />
              <Tooltip title="Save journal" placement="bottom">
                <StyledButton type="submit" variant="contained" color="primary">
                  <SaveIcon />
                </StyledButton>
              </Tooltip>
            </FormContainer>
          </Box>
          <Box sx={{ width: "40%", display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 2 }}>
            <Box sx={{ display: "flex" }}>
              <Stack direction="row" spacing={3}>
                <Tooltip title="Blockchain" placement="top">
                  <Button sx={{ marginRight: 2 }} onClick={() => navigate(`/blockchain`)}>
                    <ViewInArIcon sx={{ fontSize: "3rem" }} />
                  </Button>
                </Tooltip>
              </Stack>
              <EntriesBadge count={count} fetchedJournals={fetchedJournals} fetchJournalEntries={fetchJournalEntries} />
            </Box>
            {/* <EntriesBadge count={count} fetchedJournals={fetchedJournals} fetchJournalEntries={fetchJournalEntries} /> */}

            <Search count={count} setCount={setCount} />
          </Box>
        </Box>
        <Box>
          {/* ------ Loaders, Success, Errors ------ */}
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
    </Background>
  );
};
export default Journal;
