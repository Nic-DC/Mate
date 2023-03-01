import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import zxcvbn from "zxcvbn";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";

import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
    //   return;
    // }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const endpoint = "http://localhost:3001/users/account";
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
      navigate("/home");
    }
  }, [isRegistered]);

  return (
    <Card sx={{ padding: 2, marginTop: 10, width: "30%", backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
      <Box>
        <Box component="form" onSubmit={handleSubmit}>
          <OutlinedInput
            // id="message-input"
            type="text"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)", marginBottom: 1.5 }}
            fullWidth
            placeholder="username"
            size="small"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <OutlinedInput
            type="email"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)", marginBottom: 1.5 }}
            fullWidth
            placeholder="email"
            size="small"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <OutlinedInput
            type="password"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)", marginBottom: 1.5 }}
            fullWidth
            placeholder="password"
            size="small"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button>REGISTER</Button>
        </Box>
      </Box>
    </Card>
  );
};
export default Register;
