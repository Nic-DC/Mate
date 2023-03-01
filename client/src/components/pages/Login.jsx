import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import zxcvbn from "zxcvbn";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
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

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check password strength
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if (!strongRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Handle login logic here
    console.log("Login submitted", username, email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextField label="Username" variant="outlined" value={username} onChange={handleUsernameChange} />
        <StyledTextField label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <StyledButton variant="contained" color="primary" type="submit">
          Login
        </StyledButton>
      </StyledForm>
    </ThemeProvider>
  );
};

export default Login;
