import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import zxcvbn from "zxcvbn";

import Box from "@mui/material/Box";

import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import Modal from "@mui/material/Modal";
// import { orange } from "@mui/material/colors";

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

const PasswordStrengthText = styled("div")({
  color: (props) => (props.passwordStrength >= 2 ? theme.palette.success.main : theme.palette.error.main),
  fontSize: "0.75rem",
  color: "rgba(255,255,255,0.4)",
});

const Register = ({ handleOpenRegister, handleCloseRegister, openRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log("ON _ REGISTER: ", openRegister);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isRegistered, setIsRegistered] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordStrengthArray = ["Weak", "Fair", "Good", "Strong", "Very strong"];

  const calculatePasswordStrength = (password) => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  };

  console.log("formData", formData);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "password") {
      calculatePasswordStrength(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (passwordStrength < 1) {
    //   toast.error("Password is too weak. Please choose a stronger password.");
    // } else {
    //   console.log("Registered");
    // }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const endpoint = "http://localhost:3009/users/account";
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to register user");
      }
      const data = await response.json();
      console.log("data from fetch: ", data);
      // dispatch(setUserInfoAction(data));

      console.log("REGISTER data from fetch: ", data);
      localStorage.setItem("accessToken", `${data.accessToken}`);
      localStorage.setItem("refreshToken", `${data.refreshToken}`);
      setIsRegistered(true);

      toast.success("Registration successful!");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      const errorMessage = "Registration failed. Please try again later.";

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/journal");
    }
  }, [isRegistered]);

  return (
    <>
      {!openRegister && (
        <StyledButton variant="contained" color="primary" onClick={handleOpenRegister}>
          Register
        </StyledButton>
      )}
      <Modal
        open={openRegister}
        onClose={handleCloseRegister}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={{ ...theme.palette.primary, backgroundColor: "rgba(0, 0, 0, 1)", p: 2, m: 12 }}>
          <ThemeProvider theme={theme}>
            <StyledForm onSubmit={handleSubmit}>
              <StyledTextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
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
              <PasswordStrengthText passwordStrength={passwordStrength}>
                Password strength: {passwordStrengthArray[passwordStrength]}
              </PasswordStrengthText>
              <StyledButton variant="contained" color="primary" type="submit">
                Register
              </StyledButton>
            </StyledForm>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
};

export default Register;
