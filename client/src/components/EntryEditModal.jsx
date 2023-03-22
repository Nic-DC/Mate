import IconButton from "@mui/material/IconButton";

import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
// import { orange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJournalAction } from "../redux/actions";
import JournalPDFbutton from "./JournalPDFbutton";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
    },
  },
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(4),
});

const StyledTextField = styled(TextField)({
  width: "30%", // Add this line
  margin: theme.spacing(2),
  marginLeft: "auto", // Add this line
  marginRight: "auto", // Add this line

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

const EntryEditModal = ({ content, title, topic }) => {
  const [formData, setFormData] = useState({
    title: title,
    topic: topic,
    content: content,
  });
  console.log("formData", formData);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const id = useSelector((store) => store.journals.selectedJournal._id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    console.log("ID EDIT MODAL: ", id);
    const endpoint = `http://localhost:3009/journals/journal/${id}`;
    console.log("ENDPOINT EDIT MODAL: ", endpoint);
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to EDIT journal");
      }
      const data = await response.json();
      console.log("EDIT data journal: ", data);

      if (data) {
        handleCloseEdit();
      } else {
        console.log("EDIT journal DID NOT GO THROUGH");
      }

      // setIsRegistered(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <>
      {!openEdit && (
        <IconButton edge="end" aria-label="create" onClick={handleOpenEdit} sx={{ m: 0 }}>
          <CreateIcon sx={{ color: "rgba(0, 0, 0, 0.7)" }} />
        </IconButton>
      )}

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            ...theme.palette.primary,
            position: "fixed", // Add this line
            top: 0, // Add this line
            left: 0, // Add this line
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 1)",
            p: 2,
          }}
        >
          <ThemeProvider theme={theme}>
            <StyledForm onSubmit={handleSubmit}>
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
                multiline
                rows={6}
                value={formData.content}
                onChange={handleChange}
              />

              <StyledButton variant="contained" color="primary" type="submit">
                Edit
              </StyledButton>
              <JournalPDFbutton id={id} />
            </StyledForm>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
};
export default EntryEditModal;
