import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import zxcvbn from "zxcvbn";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { display } from "@mui/system";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedAction } from "../../redux/actions";
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
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  marginTop: theme.spacing(4),
});

const StyledTextField = styled(TextField)({
  margin: theme.spacing(1),
  textAlign: "center",
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

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

const StyledButton = styled(Button)({
  margin: theme.spacing(2),
});

const Login = ({ handleCloseLogin, handleOpenLogin, openLogin, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLogged, setIsLogged] = useState(false);

  const serverUrl = process.env.REACT_APP_BE_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Login submitted", formData.email, formData.password);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    // const endpoint = "http://localhost:3009/users/session";
    const endpoint = `${serverUrl}/users/session`;

    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to login user");
      }
      const data = await response.json();
      console.log("data from fetch: ", data);

      console.log("REGISTER data from fetch: ", data);
      localStorage.setItem("accessToken", `${data.accessToken}`);
      localStorage.setItem("refreshToken", `${data.refreshToken}`);

      dispatch(setIsLoggedAction(true));
      setIsLogged(true);

      toast.success("Registration successful!");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      const errorMessage = "Login failed. Please try again later.";

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged]);

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
        {/* <Box sx={{ ...theme.palette.primary, backgroundColor: "rgba(0, 0, 0, 1)", p: 2, m: 12 }}> */}
        <Box
          sx={{
            ...theme.palette.primary,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 1)",
            p: 2,
          }}
        >
          <ThemeProvider theme={theme}>
            <StyledContainer>
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
            </StyledContainer>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
};

export default Login;
