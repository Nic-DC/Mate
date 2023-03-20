import { createTheme, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    background: {
      default: "rgba(0, 0, 0, 0.8)",
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

export { theme, FormContainer, StyledTextField, StyledButton };
