import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import zxcvbn from "zxcvbn";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { display } from "@mui/system";
//import { orange } from "@mui/material/colors";

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

const Login = ({ handleCloseLogin, handleOpenLogin, openLogin, setIsAuthenticated }) => {
  // const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
  });

  console.log("login - formData", formData);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check password strength
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if (!strongRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Handle login logic here
    console.log("Login submitted", formData.username, formData.email, formData.password);
  };

  return (
    <>
      {!openLogin && (
        <StyledButton variant="contained" color="primary" onClick={handleOpenLogin}>
          Login
        </StyledButton>
      )}
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={{ ...theme.palette.primary, backgroundColor: "rgba(0, 0, 0, 1)", p: 2, m: 12 }}>
          <ThemeProvider theme={theme}>
            <StyledForm onSubmit={handleSubmit}>
              {/* <StyledTextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
              /> */}
              <StyledTextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <StyledTextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <StyledButton variant="contained" color="primary" type="submit">
                Login
              </StyledButton>
            </StyledForm>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
};

export default Login;
