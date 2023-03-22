import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2} sx={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
      <Avatar alt="Remy Sharp" src="/AI.svg" sx={{ width: 70, height: 70 }} />
    </Stack>
  );
};
export default Logo;
