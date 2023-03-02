import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import CreateIcon from "@mui/icons-material/Create";
import { Button } from "@mui/material";
import { useState } from "react";

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

const Entries = () => {
  const [countEntries, setCountEntries] = useState(null);

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
      <StyledBadge badgeContent={10}>
        <CreateIcon sx={{ fontSize: "200%" }} />
      </StyledBadge>
    </Button>
  );
};

export default Entries;
