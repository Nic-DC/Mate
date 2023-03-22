import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import CreateIcon from "@mui/icons-material/Create";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
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

const EntriesBadge = ({ count, fetchedJournals, fetchJournalEntries }) => {
  //const [fetchedJournals, setFetchedJournals] = useState([]);

  console.log("COUNT in ENTRIES: ", count);

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  useEffect(() => {
    fetchJournalEntries();
  }, [count]);

  return (
    <Tooltip title="All journals" placement="top">
      <Button
        variant="contained"
        color="secondary"
        sx={{
          borderRadius: "15%",
          minWidth: 0,
          width: 50,
          height: 50,
          padding: 0,
          marginTop: 0.5,
          marginBottom: 0.5,
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
    </Tooltip>
  );
};

export default EntriesBadge;
