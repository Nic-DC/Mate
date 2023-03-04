import { Button } from "@mui/material";

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
    <Button variant="contained" color="primary" onClick={() => handleDownloadPdf(id)}>
      Download
    </Button>
  );
};
export default JournalPDFbutton;
