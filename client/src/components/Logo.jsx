import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Logo = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/AImate.png" sx={{ width: 80, height: 80 }} />
    </Stack>
  );
};
export default Logo;