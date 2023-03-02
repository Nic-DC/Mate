import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import CreateIcon from "@mui/icons-material/Create";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { styled } from "@mui/system";

const StyledBadge = styled(Badge)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  "& .MuiBadge-badge": {
    fontSize: "125%",
  },
});

const Entries = ({ count }) => {
  const [fetchedJournals, setFetchedJournals] = useState([]);

  console.log("COUNT in ENTRIES: ", count);

  const fetchJournalEntries = async () => {
    const endpoint = `http://localhost:3009/journals`;
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Network response not ok. Failed to fetch users`);
      }

      const journals = await response.json();
      setFetchedJournals(journals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  useEffect(() => {
    fetchJournalEntries();
  }, [count]);

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        borderRadius: "15%",
        minWidth: 0,
        width: 50,
        height: 50,
        padding: 0,
        position: "relative",
        "&:hover, &:focus": {
          backgroundColor: "#90caf9",
        },
      }}
    >
      <StyledBadge badgeContent={fetchedJournals.length}>
        <CreateIcon sx={{ fontSize: "200%" }} />
      </StyledBadge>
    </Button>
  );
};

export default Entries;
