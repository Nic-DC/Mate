import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";

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
  margin: theme.spacing(1),
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

const EntryDeleteModal = ({ openDelete, handleOpenDelete, handleCloseDelete, count, setCount }) => {
  const id = useSelector((store) => store.journals.selectedJournal._id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "DELETE",
    };
    console.log("ID DELETE MODAL: ", id);
    const endpoint = `http://localhost:3009/journals/journal/${id}`;
    console.log("ENDPOINT DELETE MODAL: ", endpoint);
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to DELETE journal");
      }
      const data = await response.json();
      setCount(count - 1);

      console.log("DELETE data journal: ", data);
      if (data) {
        handleCloseDelete();
      } else {
        console.log("DELETE journal DID NOT GO THROUGH");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <>
      {!openDelete && (
        <IconButton edge="end" aria-label="delete" onClick={handleOpenDelete}>
          <DeleteIcon sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
        </IconButton>
      )}

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        sx={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            ...theme.palette.primary,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 1)",
            p: 2,
            m: 5,
            borderRadius: "4px",
          }}
        >
          <ThemeProvider theme={theme}>
            <StyledForm onSubmit={handleSubmit}>
              <Typography variant="h6" color="textSecondary" sx={{ color: "rgba(255, 255, 255, 0.6)" }} gutterBottom>
                Are you sure you want to delete journal?
              </Typography>
              <StyledButton variant="contained" color="primary" type="submit">
                Delete
              </StyledButton>
            </StyledForm>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
};
export default EntryDeleteModal;
