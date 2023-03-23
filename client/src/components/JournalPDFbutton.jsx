import { Button, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90ca",
    },
  },
});
const StyledButton = styled(Button)({
  margin: theme.spacing(2),
});

const JournalPDFbutton = ({ id }) => {
  const handleDownloadPdf = async (id) => {
    try {
      const response = await fetch(`http://localhost:3009/journals/journal/${id}/pdf`);

      if (!response.ok) {
        throw new Error(`Network response was not ok. Failed to DOWNLOAD PDF journal`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "journal.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledButton variant="contained" color="primary" onClick={() => handleDownloadPdf(id)}>
      <Tooltip title="Download as .pdf">
        <DownloadIcon />
      </Tooltip>
    </StyledButton>
    // <Button variant="contained" color="primary" onClick={() => handleDownloadPdf(id)}>

    // </Button>
  );
};
export default JournalPDFbutton;
